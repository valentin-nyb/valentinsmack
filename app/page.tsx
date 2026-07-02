"use client";
import { useEffect, useState } from "react";
import { HalftoneTrail } from "@/components/ui/halftone-trail";
import { MouseCursorBall } from "@/components/ui/mouse-cursor-ball";
import { ScrambleHover } from "@/components/ui/scramble-hover";

const disciplines = [
  "brand&identity",
  "art-direction",
  "web^product",
  "ai*design",
  "campaigns",
];

function HoverText({ text }: { text: string }) {
  return (
    <span className="hover:text-neutral-900 transition-colors duration-150">
      {text}
    </span>
  );
}

function HoverImageItem({ label, activeIndex }: { label: string; activeIndex: number | null }) {
  return (
    <div
      className="group relative h-fit w-fit overflow-visible cursor-interactive"
      data-gyro-text
      data-label={label}
      data-hover-light
    >
      <span className="font-display text-[2.8rem] md:text-[4.2rem] font-black leading-[0.85] select-none">
        <ScrambleHover
          text={label}
          activeIndex={activeIndex}
          scrambleSpeed={60}
          className="text-neutral-700"
          scrambledClassName="text-transparent [-webkit-text-stroke:1.5px_#f97316]"
        />
      </span>
    </div>
  );
}

export default function Home() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [mobileHolePos, setMobileHolePos] = useState<{ x: number; y: number } | null>(null);
  const [desktopHolePos, setDesktopHolePos] = useState<{ x: number; y: number } | null>(null);
  const [emailHolePos, setEmailHolePos] = useState<{ x: number; y: number } | null>(null);
  const [mobileTouchedChar, setMobileTouchedChar] = useState<{ label: string; index: number } | null>(null);
  const [desktopTouchedChar, setDesktopTouchedChar] = useState<{ label: string; index: number } | null>(null);
  const touchedChar = mobileTouchedChar ?? desktopTouchedChar;
  const holePos = mobileHolePos ?? desktopHolePos;

  useEffect(() => {
    setIsMobileDevice(
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-10 pb-4 md:py-14 bg-white overflow-hidden">
      <HalftoneTrail
        cellSize={10}
        colorLow="#a3a3a3"
        colorMid="#404040"
        colorHigh="#000000"
        decay={0.965}
        brushSize={0.045}
        hoverBrushSize={0.012}
        opacity={1.0}
        hoverOpacity={0.15}
        speedScale={38.0}
        onHolePosition={setMobileHolePos}
        onTouchedChar={setMobileTouchedChar}
      />
      <MouseCursorBall
        onHolePosition={setDesktopHolePos}
        onEmailHolePosition={setEmailHolePos}
        onTouchedChar={setDesktopTouchedChar}
      />
      {mobileHolePos && (
        <a
          href="https://valentinsmack.myportfolio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-40 whitespace-nowrap font-mono text-[11px] text-orange-500 hover:text-orange-700 transition-colors tracking-wider uppercase"
          style={{
            left: mobileHolePos.x - 80,
            top: mobileHolePos.y + 22,
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          Portfolio ↗
        </a>
      )}
      {desktopHolePos && (
        <a
          href="https://valentinsmack.myportfolio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-40 whitespace-nowrap font-mono text-[11px] text-orange-500 hover:text-orange-700 transition-colors tracking-wider uppercase"
          style={{
            left: desktopHolePos.x - 125,
            top: desktopHolePos.y + 22,
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          Portfolio ↗
        </a>
      )}

      {/* Header */}
      <div className="relative z-10 -mt-4 md:mt-0" data-hover>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-1">
          <span className="text-orange-500">Valentin Suarez Mackeprang</span>
        </p>
        <p className="font-mono text-[11px] tracking-[0.15em] text-neutral-300 uppercase">
          <HoverText text="Buenos Aires → Madrid → Aspen → " />
          <span className="text-orange-500">London</span>
        </p>
      </div>
      {!emailHolePos && !isMobileDevice && (
        <a
          href="mailto:smack.valentin@gmail.com"
          className="fixed z-10 top-10 right-6 md:top-14 md:right-12 font-mono text-[11px] text-orange-500 hover:text-orange-700 transition-colors tracking-wider uppercase"
        >
          Email ↗
        </a>
      )}
      {emailHolePos && (
        <a
          href="mailto:smack.valentin@gmail.com"
          className="fixed z-40 whitespace-nowrap font-mono text-[11px] text-orange-500 hover:text-orange-700 transition-colors tracking-wider uppercase"
          style={{
            left: emailHolePos.x - 95,
            top: emailHolePos.y + 10,
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          Email ↗
        </a>
      )}

      {/* Centre — discipline list */}
      <div className="relative z-10 flex flex-col items-center gap-3 mt-0 mb-8 md:my-8 text-center">
        {disciplines.map((label, i) => (
          <HoverImageItem
            key={i}
            label={label}
            activeIndex={touchedChar?.label === label ? touchedChar.index : null}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between">
        <p className="font-mono text-[11px] text-orange-500 tracking-wider uppercase max-w-xs leading-relaxed md:mt-8" data-hover>
          Art Director & Designer.<br />
          Brand identity, campaigns,<br />
          web & AI design.
        </p>
        <div className="flex flex-col items-end justify-end self-stretch gap-2">
          {isMobileDevice && (
            <a href="mailto:smack.valentin@gmail.com" className="font-mono text-[11px] text-orange-500 hover:text-orange-700 transition-colors tracking-wider uppercase">Email ↗</a>
          )}
          {!holePos && !isMobileDevice && (
            <a href="https://valentinsmack.myportfolio.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-orange-500 hover:text-orange-700 transition-colors tracking-wider uppercase">Portfolio ↗</a>
          )}
        </div>
      </div>
    </main>
  );
}
