"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import type { Project } from "@/lib/content";
import { FolderGallery } from "@/components/ui/folder-gallery";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <m.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-neutral-950/95 px-4 py-16 backdrop-blur-sm md:px-10 md:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="fixed right-6 top-6 z-[110] text-[13px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-100"
          >
            Close ✕
          </button>

          <m.div
            className="relative w-full max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[13px] tracking-[0.15em] text-neutral-500">{project.category}</p>
            <h2 className="mt-4 font-display text-4xl font-black leading-[0.95] text-neutral-50 md:text-6xl">
              {project.title}
            </h2>

            {project.images && project.images.length > 0 && (
              <FolderGallery
                images={project.images}
                folderName={`${project.title}.gallery`}
              />
            )}

            {project.description && (
              <p className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-neutral-300">
                {project.description}
              </p>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
