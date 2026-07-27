"use client";

import { useState } from "react";

export interface FrameItem {
  id: string | number;
  title: string;
  category: string;
  media: { type: "image"; src: string } | { type: "video"; src: string };
  onClick?: () => void;
}

interface DynamicFrameLayoutProps {
  items: FrameItem[];
  columns: number;
  rows: number;
  className?: string;
  hoverSize?: number;
  gapSize?: number;
}

export function DynamicFrameLayout({
  items,
  columns,
  rows,
  className = "",
  hoverSize = 6,
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  const trackSizes = (count: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return `repeat(${count}, 1fr)`;
    // Baseline per track is 4fr (matching the uniform state), so total budget
    // to redistribute is count * 4 — conserves total track size on hover.
    const nonHoveredSize = (count * 4 - hoverSize) / (count - 1 || 1);
    return Array.from({ length: count }, (_, i) =>
      i === hoveredIndex ? `${hoverSize}fr` : `${nonHoveredSize}fr`
    ).join(" ");
  };

  return (
    <div
      className={`grid w-full ${className}`}
      style={{
        gridTemplateColumns: trackSizes(columns, hovered?.col ?? null),
        gridTemplateRows: trackSizes(rows, hovered?.row ?? null),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {items.map((item, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        const isHovered = hovered?.row === row && hovered?.col === col;

        return (
          <div
            key={item.id}
            className="group relative cursor-pointer overflow-hidden bg-neutral-900"
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
            onClick={item.onClick}
          >
            {item.media.type === "video" ? (
              <video
                src={item.media.src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.media.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />
            )}

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-950/90 via-neutral-950/0 to-neutral-950/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-[11px] tracking-[0.15em] text-neutral-300">{item.category}</p>
              <p className="mt-1 font-display text-lg font-black leading-tight text-neutral-50">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
