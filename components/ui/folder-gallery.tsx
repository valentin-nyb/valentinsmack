"use client";

import { useState } from "react";
import { motion, type PanInfo } from "framer-motion";

interface FolderGalleryProps {
  images: string[];
  folderName: string;
  dragHintText?: string;
}

export function FolderGallery({
  images,
  folderName,
  dragHintText = "Drag a photo down to close",
}: FolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);

  if (images.length === 0) return null;

  const preview = images.slice(0, 5);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 && isFolderOpen) {
      setIsFolderOpen(false);
      setHoverFolder(false);
    }
  };

  return (
    <div className="relative w-full py-16">
      <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center">
        <div className="pointer-events-none relative flex h-[420px] w-full max-w-sm justify-center">
          <motion.div
            className="absolute bottom-6 h-48 w-72 drop-shadow-2xl"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
          >
            <div className="absolute left-0 top-0 h-8 w-28 rounded-t-xl border-l border-r border-t border-white/10 bg-gradient-to-t from-[#1e1e1e] to-[#2a2a2a]" />
            <div className="absolute bottom-0 left-0 right-0 top-7 rounded-b-xl rounded-tr-xl border border-white/10 bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
            <div className="pointer-events-none absolute bottom-2 left-2 right-2 top-9 rounded-lg bg-black shadow-inner" />
          </motion.div>

          <div className="absolute bottom-8 z-10 flex justify-center">
            {preview.map((src, i) => {
              const offset = i - (preview.length - 1) / 2;

              const stackY = hoverFolder ? offset * -10 - 30 : offset * -5;
              const stackX = hoverFolder ? offset * 24 : offset * 3;
              const stackRotate = hoverFolder ? offset * 8 : offset * 3;
              const stackScale = 1 - Math.abs(offset) * 0.03;

              const openY = -100;
              const openX = offset * 90;

              return (
                <motion.div
                  key={src}
                  drag={isFolderOpen}
                  dragSnapToOrigin
                  onDragEnd={handleDragEnd}
                  className={`absolute bottom-0 h-56 w-40 origin-bottom overflow-hidden rounded-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${
                    isFolderOpen ? "pointer-events-auto cursor-grab active:cursor-grabbing" : "pointer-events-none"
                  }`}
                  animate={
                    !isFolderOpen
                      ? { y: stackY, x: stackX, rotate: stackRotate, scale: stackScale, zIndex: i + 10 }
                      : { y: openY, x: openX, rotate: 0, scale: 1.05, zIndex: 50 }
                  }
                  whileHover={isFolderOpen ? { scale: 1.1, zIndex: 100 } : {}}
                  whileDrag={isFolderOpen ? { scale: 1.15, rotate: 5, zIndex: 150 } : {}}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={folderName}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="pointer-events-auto absolute bottom-0 z-20 h-36 w-[310px] cursor-pointer drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
            style={{ transformOrigin: "bottom" }}
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              rotateX: hoverFolder ? -25 : 0,
              y: hoverFolder ? 10 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto",
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-[#2a2a2a] to-[#111] pb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="flex items-center justify-center rounded-lg border border-black/80 bg-black px-4 py-2 shadow-inner">
                <span className="text-sm font-medium tracking-wide text-white/90">
                  {folderName}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 30 }}
          className="pointer-events-none absolute bottom-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-medium uppercase tracking-widest text-white/50 backdrop-blur-md"
        >
          {dragHintText}
        </motion.div>
      </div>
    </div>
  );
}
