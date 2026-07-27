"use client";

import { useState } from "react";
import { projects, type Project } from "@/lib/content";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { cn } from "@/lib/utils";

export function Work() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="work" className="border-t border-neutral-800 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Selected Work</p>

        <div className="mt-8">
          {projects.map((project, i) => (
            <button
              key={project.title}
              onClick={() => setOpenProject(project)}
              className={cn(
                "group flex w-full flex-col gap-10 border-b border-neutral-900 py-20 text-left md:flex-row md:items-center md:gap-20 md:py-28",
                i % 2 === 1 && "md:flex-row-reverse"
              )}
            >
              <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden bg-neutral-900">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center transition-opacity duration-500 group-hover:opacity-60">
                    <span className="font-serif text-6xl italic text-neutral-700 md:text-8xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-[13px] tracking-[0.15em] text-neutral-500">
                  {project.category}
                </p>
                <h3 className="mt-4 max-w-sm font-display text-4xl font-black leading-[0.95] text-neutral-100 transition-colors duration-300 group-hover:text-orange-500 md:text-5xl">
                  {project.title}
                </h3>
                <span className="relative mt-8 inline-block text-[13px] tracking-wide text-neutral-400 transition-colors duration-300 group-hover:text-neutral-100">
                  View Project
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
