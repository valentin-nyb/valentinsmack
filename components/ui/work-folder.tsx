"use client";

import { useState } from "react";
import { m } from "framer-motion";

export function WorkFolder({
  title,
  category,
  images,
  onClick,
  size = 170,
  isDesktop = true,
}: {
  title: string;
  category: string;
  images: string[];
  onClick: () => void;
  size?: number;
  isDesktop?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const preview = images.slice(0, 4);

  const frontW = size;
  const frontH = size * 0.72;
  const backW = size * 1.14;
  const backH = frontH * 0.82;
  const cardW = frontW * 0.5;
  const cardH = frontH * 1.55;

  // Desktop: hover reveals the fan, a click always opens. Touch has no
  // hover, so the first tap reveals the fan and a second tap (while
  // already revealed) opens the project.
  const handleClick = () => {
    if (isDesktop || hovered) {
      onClick();
      return;
    }
    setHovered(true);
  };

  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center"
      style={{ width: backW }}
      onMouseEnter={isDesktop ? () => setHovered(true) : undefined}
      onMouseLeave={isDesktop ? () => setHovered(false) : undefined}
      onClick={handleClick}
    >
      <div className="relative" style={{ height: backH + 44, width: backW }}>
        <m.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 drop-shadow-2xl"
          style={{ width: backW, height: backH, willChange: "transform" }}
          animate={{ scale: hovered ? 0.97 : 1 }}
        >
          <div className="absolute left-0 top-0 h-6 w-20 rounded-t-lg border-l border-r border-t border-white/10 bg-gradient-to-t from-[#1e1e1e] to-[#2a2a2a]" />
          <div className="absolute bottom-0 left-0 right-0 top-5 rounded-b-lg rounded-tr-lg border border-white/10 bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
        </m.div>

        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 justify-center">
          {preview.map((src, i) => {
            const offset = i - (preview.length - 1) / 2;
            const stackY = hovered ? offset * -9 - 20 : offset * -4;
            const stackX = hovered ? offset * 20 : offset * 3;
            const stackRotate = hovered ? offset * 7 : offset * 2;

            return (
              <m.div
                key={src}
                className="absolute bottom-0 origin-bottom overflow-hidden rounded-lg border border-white/20 bg-neutral-950 shadow-lg"
                style={{ width: cardW, height: cardH, willChange: "transform" }}
                animate={{
                  y: stackY,
                  x: stackX,
                  rotate: stackRotate,
                  zIndex: preview.length - i,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </m.div>
            );
          })}
        </div>

        <m.div
          className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 drop-shadow-[0_-16px_30px_rgba(0,0,0,0.8)]"
          style={{ width: frontW, height: frontH, transformOrigin: "bottom", willChange: "transform" }}
          animate={{ rotateX: hovered ? -24 : 0, y: hovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <div className="relative flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-[#2a2a2a] to-[#111] p-3 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <p className="text-[9px] tracking-[0.12em] text-neutral-400">{category}</p>
            <p className="font-display text-[13px] font-black leading-tight text-neutral-50">
              {title}
            </p>
          </div>
        </m.div>
      </div>
    </div>
  );
}
