"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "./i18n/en";
import type { Slide } from "./ImageSlider";
import type { PsiModel, PsiScene } from "./psiScene";

type ViewerModel = PsiModel & { id: string; label: string };

type PsiViewerProps = {
  models: ViewerModel[];
  // Shown instead when WebGL or a model fails.
  fallback: Slide[];
  accentColor: string;
  labels: Dictionary["solutions"]["rtptial"]["viewer"];
  className?: string;
};

function mediaQuery(query: string) {
  return {
    subscribe(onChange: () => void) {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    matches: () => window.matchMedia(query).matches,
  };
}

const touchScreen = mediaQuery("(hover: none) and (pointer: coarse)");

export default function PsiViewer({
  models,
  fallback,
  accentColor,
  labels,
  className = "",
}: PsiViewerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scene, setScene] = useState<PsiScene | null>(null);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState<{ url: string; hasBone: boolean } | null>(null);
  const [boneVisible, setBoneVisible] = useState(true);
  const [active, setActive] = useState(models[0].id);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  // Touch screens tap in first, so a swipe across the model still scrolls the
  // page. With a mouse, dragging always rotates and a click turns on wheel
  // zoom until the pointer leaves.
  const touch = useSyncExternalStore(touchScreen.subscribe, touchScreen.matches, () => false);
  const [engaged, setEngaged] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const wasExpanded = useRef(expanded);
  const model = models.find((m) => m.id === active) ?? models[0];
  const { url } = model;
  const [viewX, viewY, viewZ] = model.viewFrom;
  const ready = shown?.url === url;
  const hasBone = ready && shown.hasBone;
  const live = engaged || expanded;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
        else setEngaged(false);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!near || !host) return;
    let created: PsiScene | null = null;
    let cancelled = false;
    import("./psiScene")
      .then(({ createPsiScene }) => {
        if (cancelled) return;
        created = createPsiScene(host, {
          autoRotate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          accent: accentColor,
        });
        setScene(created);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      created?.dispose();
    };
  }, [near, accentColor]);

  // The full-screen layer is portaled to <body>, above the site header, and
  // mounts a new host: move the canvas into whichever host is current.
  useLayoutEffect(() => {
    if (scene && hostRef.current) scene.attach(hostRef.current);
  }, [scene, expanded]);

  useEffect(() => {
    if (!scene) return;
    let stale = false;
    scene
      .show({ url, viewFrom: [viewX, viewY, viewZ] })
      .then(({ hasBone }) => !stale && setShown({ url, hasBone }))
      .catch(() => !stale && setFailed(true));
    return () => {
      stale = true;
    };
  }, [scene, url, viewX, viewY, viewZ]);

  useEffect(() => {
    scene?.setBoneVisible(boneVisible);
  }, [scene, boneVisible]);

  useEffect(() => {
    scene?.setZoom(live);
    scene?.setRotate(!touch || live);
  }, [scene, live, touch]);

  useEffect(() => {
    scene?.setRunning((visible || expanded) && !failed);
  }, [scene, visible, expanded, failed]);

  useEffect(() => {
    // Keyboard focus follows the toggle into and out of the full-screen layer.
    if (wasExpanded.current !== expanded) toggleRef.current?.focus();
    wasExpanded.current = expanded;
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const hint = touch
    ? `${labels.hintRotate} · ${labels.hintPinch}`
    : `${labels.hintRotate} · ${live ? labels.hintScroll : labels.hintClickZoom}`;
  const iconButton =
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-white/50";

  const viewer = (
    <div
      className={`${expanded ? "fixed inset-0 z-[60]" : "absolute inset-0 rounded-xl border border-white/10"} media-stage overflow-hidden`}
      onPointerLeave={() => {
        if (!touch && !expanded) setEngaged(false);
      }}
    >
      <div
        ref={hostRef}
        role="img"
        aria-label={`${labels.label}: ${model.label}`}
        className={`absolute inset-0 ${!touch || live ? "cursor-grab active:cursor-grabbing" : ""}`}
        onPointerDown={() => {
          if (!touch) setEngaged(true);
        }}
      />

      {touch && !live && (
        <button
          type="button"
          onClick={() => setEngaged(true)}
          className="absolute inset-0 flex items-end justify-center pb-16"
        >
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-bold text-white backdrop-blur">
            <HandIcon />
            {labels.tapToExplore}
          </span>
        </button>
      )}

      <div
        role="tablist"
        aria-label={labels.label}
        className="absolute left-3 top-3 flex rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur"
      >
        {models.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === active}
            onClick={() => setActive(m.id)}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-colors md:text-sm"
            style={
              m.id === active
                ? { backgroundColor: accentColor, color: "#000" }
                : { color: "rgba(255,255,255,0.75)" }
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {touch && engaged && !expanded ? (
        <button
          type="button"
          onClick={() => setEngaged(false)}
          className="absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold text-black"
          style={{ backgroundColor: accentColor }}
        >
          {labels.done}
        </button>
      ) : (
        <span className="pointer-events-none absolute right-3 top-3 hidden items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white/80 backdrop-blur md:flex">
          <CubeIcon />
          3D
        </span>
      )}

      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-white/70">
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-white/15"
            style={{ borderTopColor: accentColor }}
          />
          {labels.loading}
        </div>
      )}

      {(!touch || live) && (
        <p
          className={`pointer-events-none absolute bottom-3.5 left-3 ${hasBone ? "right-36 md:right-52" : "right-24"}`}
        >
          <span className="inline-block rounded-md bg-black/55 px-2 py-1 text-[11px] leading-4 text-white/70 backdrop-blur md:text-xs">
            {hint}
          </span>
        </p>
      )}

      <div className="absolute bottom-3 right-3 flex gap-2">
        {hasBone && (
          <button
            type="button"
            aria-pressed={boneVisible}
            aria-label={labels.bone}
            title={labels.bone}
            onClick={() => setBoneVisible((value) => !value)}
            className={`${iconButton} md:w-auto md:gap-1.5 md:px-3 md:text-xs md:font-bold`}
            style={boneVisible ? { borderColor: accentColor, color: accentColor } : { color: "rgba(255,255,255,0.6)" }}
          >
            <BoneIcon />
            <span className="hidden md:inline">{labels.bone}</span>
          </button>
        )}
        <button
          type="button"
          aria-label={labels.reset}
          title={labels.reset}
          onClick={() => scene?.resetView()}
          className={iconButton}
        >
          <ResetIcon />
        </button>
        <button
          ref={toggleRef}
          type="button"
          aria-label={expanded ? labels.collapse : labels.expand}
          title={expanded ? labels.collapse : labels.expand}
          onClick={() => setExpanded((value) => !value)}
          className={iconButton}
        >
          {expanded ? <CloseIcon /> : <ExpandIcon />}
        </button>
      </div>
    </div>
  );

  return (
    // The outer box holds the card's space while the viewer is full screen.
    <div ref={rootRef} className={`relative ${className}`}>
      {failed ? (
        <div className="grid h-full grid-cols-2 items-center gap-4">
          {fallback.map((slide) => (
            <div key={slide.src} className="flex items-center justify-center bg-black/50 p-4">
              <img src={slide.src} alt={slide.alt} className="max-h-52 object-contain" />
            </div>
          ))}
        </div>
      ) : expanded ? (
        createPortal(viewer, document.body)
      ) : (
        viewer
      )}
    </div>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function ResetIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 3v6h6" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg {...iconProps}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function BoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg {...iconProps} width={13} height={13}>
      <path d="M12 2 3 7v10l9 5 9-5V7z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg {...iconProps} width={16} height={16}>
      <path d="M9 11V5a1.5 1.5 0 0 1 3 0v5" />
      <path d="M12 10V4a1.5 1.5 0 0 1 3 0v6" />
      <path d="M15 10V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L2.7 15a1.5 1.5 0 0 1 2.3-2l2 2V8a1.5 1.5 0 0 1 3 0" />
    </svg>
  );
}
