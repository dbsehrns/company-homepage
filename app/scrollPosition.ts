// Carries the reading position across a language switch. Each language's page
// has a different height, so the position is kept relative to the section in
// view rather than as a pixel offset. Module state survives client-side
// navigation, which is all the language links do.
let pending: { id: string; progress: number } | null = null;

function sectionBounds(section: HTMLElement) {
  const top = section.getBoundingClientRect().top + window.scrollY;
  return { top, height: section.offsetHeight };
}

export function savePosition() {
  const y = window.scrollY;
  const section = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"))
    .filter((s) => sectionBounds(s).top <= y)
    .pop();
  if (!section) return;

  const { top, height } = sectionBounds(section);
  pending = { id: section.id, progress: Math.min(1, (y - top) / height) };
}

export function restorePosition() {
  if (!pending) return;
  const section = document.getElementById(pending.id);
  if (section) {
    const { top, height } = sectionBounds(section);
    window.scrollTo(0, top + pending.progress * height);
  }
  pending = null;
}
