"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { IntroCard } from "@/components/ui/intro-card";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="flex min-h-[85svh] flex-col justify-center px-6 pt-28 md:px-10 md:pt-36"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-3 text-[13px] tracking-[0.15em] text-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          Art Director &amp; Designer — London
        </p>
        <h1 className="mt-2 max-w-4xl font-display text-5xl font-black leading-[1.05] tracking-tight text-neutral-50 md:text-7xl lg:text-[5.5rem]">
          brand strategy and{" "}
          <span className="rounded bg-brand px-1 text-neutral-950">
            art direction
          </span>{" "}
          for{" "}
          <span className="font-serif italic font-normal text-neutral-400 text-[1.15em]">
            brands
          </span>
          ,{" "}
          <span className="font-serif italic font-normal text-neutral-400 text-[1.15em]">
            retail
          </span>{" "}
          &amp;{" "}
          <span className="font-serif italic font-normal text-neutral-400 text-[1.15em]">
            experiential
          </span>
          .
          <span className="block">— built to ship product and move culture.</span>
        </h1>
        <m.div
          style={{ y: cardY }}
          className="hidden md:absolute md:bottom-44 md:-right-4 md:block"
        >
          <IntroCard
            avatarSrc="/avatar.webp"
            name="Valentin Suarez Mackeprang"
            role="Art Director & Designer"
            message={
              <>
                I&apos;m Valentin Suarez Mackeprang — working across Art
                Direction, Brand Identity and Web Design. I&apos;ve been
                living and working between Buenos Aires, Madrid and Aspen,{" "}
                <span className="rounded bg-brand px-1 text-neutral-950">
                  now based in London.
                </span>
              </>
            }
            email="smack.valentin@gmail.com"
          />
        </m.div>
      </div>
    </section>
  );
}
