// three.js side of the PSI viewer. Imported on demand by PsiViewer, so three
// stays out of the page bundle until the Solutions section is near.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  LessEqualDepth,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Sphere,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Model axes after conversion: +x patient left, +y superior, +z anterior. A
// model file holds the guide and, optionally, the bone under it: nodes named
// "bone…" (a cut bone also has "bone_cap", the flat cut face).
export type PsiModel = { url: string; viewFrom: readonly [number, number, number] };

export type PsiScene = {
  show(model: PsiModel): Promise<{ hasBone: boolean }>;
  // Moves the canvas into another element, e.g. the full-screen layer.
  attach(container: HTMLElement): void;
  setBoneVisible(visible: boolean): void;
  setZoom(enabled: boolean): void;
  setRotate(enabled: boolean): void;
  setRunning(running: boolean): void;
  resetView(): void;
  dispose(): void;
};

const FOV = 32;
// Room around the model for the tabs above it and the buttons below.
const MARGIN = 1.25;
// With bone, the opening view takes in some of the bone around the guide.
const BONE_CONTEXT = 1.5;
const RESET_MS = 600;
const BONE_COLOR = 0xa8a8a3;
const GUIDE_COLOR = 0x5fa52a;
const GUIDE_OPACITY = 0.7;

type Part = { geometry: BufferGeometry; bone: boolean };
type Loaded = { parts: Part[]; focus: Sphere; outer: Sphere; hasBone: boolean };

// Positions arrive quantized (int16 in -1..1). Copy them out as floats before
// baking the dequantization transform; written back into the int16 array,
// every vertex would clamp onto a cube.
function bake(mesh: Mesh) {
  const quantized = mesh.geometry.getAttribute("position");
  const positions = new Float32Array(quantized.count * 3);
  for (let i = 0; i < quantized.count; i++) {
    positions[i * 3] = quantized.getX(i);
    positions[i * 3 + 1] = quantized.getY(i);
    positions[i * 3 + 2] = quantized.getZ(i);
  }
  const baked = new BufferGeometry();
  baked.setAttribute("position", new BufferAttribute(positions, 3));
  baked.setIndex(mesh.geometry.getIndex());
  return baked.applyMatrix4(mesh.matrixWorld);
}

export function createPsiScene(
  container: HTMLElement,
  options: { autoRotate: boolean; accent: string },
): PsiScene {
  // Throws where WebGL is unavailable; the caller falls back to photos.
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = NeutralToneMapping;
  renderer.domElement.className = "block h-full w-full outline-none";
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  scene.add(new HemisphereLight(0xffffff, 0x1a1a1a, 0.6));

  // Lights and their targets ride with the camera, so the directions hold in
  // view space: key from upper left, accent rim from behind on the right.
  const camera = new PerspectiveCamera(FOV, 1, 1, 2000);
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(-1, 1.5, 1.2);
  const rim = new DirectionalLight(new Color(options.accent), 1.4);
  rim.position.set(1.4, 0.9, -1.6);
  camera.add(key, key.target, rim, rim.target);
  scene.add(camera);

  // Double-sided, so a gap in a bone surface shows bone, not what's behind it.
  const boneMaterial = new MeshStandardMaterial({
    color: BONE_COLOR,
    roughness: 0.75,
    metalness: 0,
    envMapIntensity: 0.4,
    side: DoubleSide,
  });
  // The guide is see-through over the bone. A depth-only pass first keeps
  // just its nearest surface, so its own far side never shows through it.
  const guideDepth = new MeshBasicMaterial({ colorWrite: false });
  const guideMaterial = new MeshStandardMaterial({
    color: GUIDE_COLOR,
    roughness: 0.4,
    metalness: 0,
    envMapIntensity: 0.55,
    transparent: true,
    opacity: GUIDE_OPACITY,
    depthWrite: false,
    depthFunc: LessEqualDepth,
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = options.autoRotate;
  controls.autoRotateSpeed = 1.2;
  controls.addEventListener("start", () => {
    controls.autoRotate = false;
    tween = null;
  });

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const models = new Map<string, Promise<Loaded>>();
  const group = new Group();
  scene.add(group);

  let home = { position: new Vector3(), target: new Vector3() };
  let tween: { from: Vector3; to: Vector3; start: number } | null = null;
  let current = "";
  let boneVisible = true;
  // The opening view fits fitRadius; zooming out may take in outerRadius.
  let fitRadius = 0;
  let outerRadius = 0;
  let guideRadius = 0;
  // Set when something other than the controls changed the picture.
  let dirty = true;

  function loadModel(url: string) {
    let model = models.get(url);
    if (!model) {
      model = loader.loadAsync(url).then((gltf) => {
        gltf.scene.updateMatrixWorld(true);
        const parts: Part[] = [];
        gltf.scene.traverse((object) => {
          const mesh = object as Mesh;
          if (!mesh.isMesh) return;
          const bone = /bone/i.test(mesh.name);
          const baked = bake(mesh);
          mesh.geometry.dispose();
          // Bone is organic and shades smooth; creases keep the guide's flat
          // faces and slot edges sharp.
          let geometry = baked;
          if (bone) {
            baked.computeVertexNormals();
          } else {
            geometry = toCreasedNormals(baked, Math.PI / 6);
            baked.dispose();
          }
          geometry.computeBoundingSphere();
          parts.push({ geometry, bone });
        });
        if (!parts.length) throw new Error(`no mesh in ${url}`);
        const guides = parts.filter((part) => !part.bone);
        const focus = new Sphere().copy((guides[0] ?? parts[0]).geometry.boundingSphere!);
        for (const part of guides.slice(1)) focus.union(part.geometry.boundingSphere!);
        const outer = focus.clone();
        for (const part of parts) outer.union(part.geometry.boundingSphere!);
        return { parts, focus, outer, hasBone: guides.length < parts.length };
      });
      model.catch(() => models.delete(url));
      models.set(url, model);
    }
    return model;
  }

  // Camera distance at which a sphere of this radius fills the narrower of
  // the two fields of view, so portrait screens don't crop it.
  function distanceFor(radius: number) {
    const vertical = (FOV * Math.PI) / 360;
    const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
    return (radius / Math.sin(Math.min(vertical, horizontal))) * MARGIN;
  }

  function setDepth(distance: number) {
    const farthest = Math.max(distance * 2, distanceFor(outerRadius) * 1.1);
    camera.near = distance / 50;
    camera.far = farthest * 3;
    camera.updateProjectionMatrix();
    controls.minDistance = guideRadius * 1.3;
    controls.maxDistance = farthest;
  }

  function frame(model: Loaded, viewFrom: readonly [number, number, number]) {
    guideRadius = model.focus.radius;
    fitRadius = guideRadius * (model.hasBone ? BONE_CONTEXT : 1);
    outerRadius = model.outer.radius;
    const distance = distanceFor(fitRadius);
    const direction = new Vector3(...viewFrom).normalize();
    home = {
      position: model.focus.center.clone().addScaledVector(direction, distance),
      target: model.focus.center.clone(),
    };
    camera.position.copy(home.position);
    controls.target.copy(home.target);
    setDepth(distance);
    controls.update();
  }

  function resize() {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;
    const before = fitRadius && distanceFor(fitRadius);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (before) {
      // Keep the view direction and the zoom relative to the new fit.
      const distance = distanceFor(fitRadius);
      const scale = distance / before;
      camera.position.sub(controls.target).multiplyScalar(scale).add(controls.target);
      home.position.sub(home.target).multiplyScalar(scale).add(home.target);
      setDepth(distance);
    }
    dirty = true;
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  function tick(now: number) {
    let moved = false;
    if (tween) {
      const t = Math.min((now - tween.start) / RESET_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(tween.from, tween.to, eased);
      if (t === 1) tween = null;
      moved = true;
    }
    // update() reports any camera motion, damping and auto-rotate included,
    // so a still view costs no redraws.
    if (controls.update() || moved || dirty) {
      renderer.render(scene, camera);
      dirty = false;
    }
  }

  return {
    async show(model) {
      current = model.url;
      const loaded = await loadModel(model.url);
      if (current !== model.url) return { hasBone: loaded.hasBone }; // a newer tab won
      group.clear();
      for (const part of loaded.parts) {
        if (part.bone) {
          const bone = new Mesh(part.geometry, boneMaterial);
          bone.userData.bone = true;
          bone.visible = boneVisible;
          group.add(bone);
        } else {
          const depth = new Mesh(part.geometry, guideDepth);
          depth.renderOrder = 1;
          const guide = new Mesh(part.geometry, guideMaterial);
          guide.renderOrder = 2;
          group.add(depth, guide);
        }
      }
      frame(loaded, model.viewFrom);
      dirty = true;
      return { hasBone: loaded.hasBone };
    },
    attach(next) {
      if (next === container) return;
      container = next;
      next.appendChild(renderer.domElement);
      resizeObserver.disconnect();
      resizeObserver.observe(next);
      resize();
    },
    setBoneVisible(visible) {
      boneVisible = visible;
      for (const child of group.children) if (child.userData.bone) child.visible = visible;
      dirty = true;
    },
    setZoom(enabled) {
      controls.enableZoom = enabled;
    },
    setRotate(enabled) {
      controls.enableRotate = enabled;
    },
    setRunning(running) {
      dirty = true;
      renderer.setAnimationLoop(running ? tick : null);
    },
    resetView() {
      controls.target.copy(home.target);
      tween = { from: camera.position.clone(), to: home.position.clone(), start: performance.now() };
      controls.autoRotate = options.autoRotate;
    },
    dispose() {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      controls.dispose();
      for (const model of models.values())
        model.then((loaded) => loaded.parts.forEach((part) => part.geometry.dispose()), () => {});
      boneMaterial.dispose();
      guideDepth.dispose();
      guideMaterial.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
