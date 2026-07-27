"use client";

import { useEffect, useRef, useState } from "react";

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
  gapSize?: number;
  fixedHeight?: boolean;
}

function FrameMedia({
  media,
  title,
  isHovered,
}: {
  media: FrameItem["media"];
  title: string;
  isHovered: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (media.type !== "video") return;
    if (isHovered) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isHovered, media.type]);

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        src={media.src}
        loop
        muted
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      alt={title}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
    />
  );
}

export function DynamicFrameLayout({
  items,
  columns,
  rows,
  className = "",
  gapSize = 4,
  fixedHeight = true,
}: DynamicFrameLayoutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`grid w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: fixedHeight ? `repeat(${rows}, 1fr)` : undefined,
        gap: `${gapSize}px`,
      }}
    >
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;

        return (
          <div
            key={item.id}
            className={`group relative cursor-pointer bg-neutral-900 ${fixedHeight ? "" : "aspect-[4/5]"}`}
            style={{
              zIndex: isHovered ? 10 : 1,
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.25s ease-out",
              willChange: "transform",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={item.onClick}
          >
            <div className="absolute inset-0 overflow-hidden">
              <FrameMedia media={item.media} title={item.title} isHovered={isHovered} />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-950/95 via-neutral-950/10 to-transparent p-3 opacity-100 transition-opacity duration-300 md:from-neutral-950/90 md:via-neutral-950/0 md:p-4 md:opacity-0 md:group-hover:opacity-100">
              <p className="text-[10px] tracking-[0.1em] text-neutral-300 md:text-[11px] md:tracking-[0.15em]">
                {item.category}
              </p>
              <p className="mt-1 font-display text-sm font-black leading-tight text-neutral-50 md:text-lg">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
