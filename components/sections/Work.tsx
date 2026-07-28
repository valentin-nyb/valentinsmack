"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { WorkFolder } from "@/components/ui/work-folder";

// Deterministic pseudo-random in [0, 1), seeded by index — keeps the
// scattered layout stable across server/client renders instead of
// reshuffling on every load.
function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export function Work() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef<boolean[]>(projects.map(() => false));

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const cols = isDesktop ? 5 : 2;
  const rows = Math.ceil(projects.length / cols);
  const rowHeight = isDesktop ? 340 : 230;
  const folderSize = isDesktop ? 210 : 135;

  return (
    <section id="work" className="px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Selected Work</p>

        <div ref={containerRef} className="relative mt-10" style={{ height: rows * rowHeight }}>
          {projects.map((project, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const cellW = 100 / cols;
            const cellH = 100 / rows;

            const jitterX = (seededRandom(i * 2 + 1) - 0.5) * cellW * 0.55;
            const jitterY = (seededRandom(i * 2 + 2) - 0.5) * cellH * 0.5;
            const rotate = (seededRandom(i * 3 + 5) - 0.5) * 14;

            const left = col * cellW + cellW / 2 + jitterX;
            const top = row * cellH + cellH / 2 + jitterY;

            return (
              <div
                key={project.title}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%`, rotate: `${rotate}deg`, zIndex: i }}
              >
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0.12}
                  dragConstraints={containerRef}
                  onDragStart={() => {
                    draggedRef.current[i] = false;
                  }}
                  onDrag={(_, info) => {
                    if (Math.abs(info.offset.x) > 4 || Math.abs(info.offset.y) > 4) {
                      draggedRef.current[i] = true;
                    }
                  }}
                >
                  <WorkFolder
                    title={project.title}
                    category={project.category}
                    images={
                      project.previewImages?.length
                        ? project.previewImages
                        : [project.image ?? ""]
                    }
                    size={folderSize}
                    onClick={() => {
                      if (draggedRef.current[i]) {
                        draggedRef.current[i] = false;
                        return;
                      }
                      setOpenProject(project);
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
