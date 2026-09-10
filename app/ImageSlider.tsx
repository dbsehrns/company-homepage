"use client";

import { useEffect, useState } from "react";

export type Slide = { src: string; alt: string };

type ImageSliderProps = {
  slides: Slide[];
  accentColor: string;
  intervalMs?: number;
  className?: string;
};

export default function ImageSlider({
  slides,
  accentColor,
  intervalMs = 3500,
  className = "",
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, slides.length, intervalMs]);

  const step = (delta: number) =>
    setIndex((current) => (current + delta + slides.length) % slides.length);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-2.5 py-1 text-xl leading-none text-white transition-opacity hover:bg-black/80 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100";

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => step(-1)}
            className={`${arrowClass} left-2`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => step(1)}
            className={`${arrowClass} right-2`}
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="h-1.5 w-5 rounded-full transition-colors"
                style={{
                  backgroundColor: i === index ? accentColor : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
