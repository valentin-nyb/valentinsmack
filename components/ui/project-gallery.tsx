"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

const springTransition = { type: "spring", stiffness: 160, damping: 20, mass: 1 } as const;

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [expanded, setExpanded] = useState(false);
  const layoutId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [expanded]);

  if (images.length === 0) return null;

  const preview = images.slice(0, 3);

  return (
    <LayoutGroup id={layoutId}>
      <div ref={containerRef}>
        {expanded ? (
          <>
            <button
              onClick={() => setExpanded(false)}
              className="mb-4 text-[13px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-100"
            >
              ← Collapse
            </button>
            <motion.div layout className="grid grid-cols-2 gap-4" transition={springTransition}>
              {images.map((src, i) => (
                <motion.div
                  key={src}
                  layoutId={`${layoutId}-photo-${i}`}
                  className="relative aspect-[4/3] overflow-hidden border border-neutral-800"
                  transition={springTransition}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="relative flex h-56 w-full items-center justify-center md:h-64"
            aria-label={`Expand ${alt} gallery`}
          >
            {preview.map((src, i) => (
              <motion.div
                key={src}
                layoutId={`${layoutId}-photo-${i}`}
                className="absolute h-40 w-52 overflow-hidden border border-neutral-800 shadow-xl md:h-48 md:w-64"
                style={{ zIndex: preview.length - i }}
                initial={false}
                animate={{
                  rotate: (i - (preview.length - 1) / 2) * 6,
                  x: (i - (preview.length - 1) / 2) * 40,
                }}
                whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                transition={springTransition}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </button>
        )}
      </div>
    </LayoutGroup>
  );
}
