"use client";

import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/content";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { DynamicFrameLayout, type FrameItem } from "@/components/ui/dynamic-frame-layout";

export function Work() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const items: FrameItem[] = projects.map((project) => ({
    id: project.title,
    title: project.title,
    category: project.category,
    media: project.video
      ? { type: "video", src: project.video }
      : { type: "image", src: project.image ?? "" },
    onClick: () => setOpenProject(project),
  }));

  return (
    <section id="work" className="px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Selected Work</p>

        <div className="mt-6">
          <DynamicFrameLayout
            items={items}
            columns={isDesktop ? 5 : 2}
            rows={isDesktop ? 2 : 5}
            gapSize={4}
            className="h-[60vh] md:h-[70vh]"
          />
        </div>
      </div>
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
