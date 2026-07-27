"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";
import { ProjectGallery } from "@/components/ui/project-gallery";

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
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-neutral-950/90 px-4 py-16 backdrop-blur-sm md:px-10 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl border border-neutral-800 bg-neutral-950 p-8 md:p-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 text-[13px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-100"
            >
              Close ✕
            </button>

            <p className="text-[13px] tracking-[0.15em] text-neutral-500">{project.category}</p>
            <h2 className="mt-4 font-display text-4xl font-black leading-[0.95] text-neutral-50 md:text-6xl">
              {project.title}
            </h2>

            {project.images && project.images.length > 0 && (
              <div className="mt-10">
                <ProjectGallery images={project.images} alt={project.title} />
              </div>
            )}

            <p className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-neutral-300">
              {project.description ??
                "Full case study coming soon. In the meantime, this project is viewable on the complete portfolio."}
            </p>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-10 inline-block text-[13px] tracking-wide text-neutral-100"
            >
              View Full Case Study ↗
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
