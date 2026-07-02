"use client";
import { HalftoneTrail } from "@/components/ui/halftone-trail";

const disciplines = [
  "brand&identity",
  "art-direction",
  "web^product",
  "ai*design",
  "campaigns",
];

function HoverText({ text, outline = false }: { text: string; outline?: boolean }) {
  if (outline) {
    return (
      <span className="text-neutral-700 [-webkit-text-stroke:0px] hover:text-transparent hover:[-webkit-text-stroke:1.5px_#f97316] transition-all duration-150">
        {text}
      </span>
    );
  }
  return (
    <span className="hover:text-neutral-900 transition-colors duration-150">
      {text}
    </span>
  );
}

function HoverImageItem({ label }: { label: string }) {
  return (
    <div className="group relative h-fit w-fit overflow-visible cursor-interactive" data-hover>
      <span className="font-display text-[2.8rem] md:text-[4.2rem] font-black leading-[0.85] select-none">
        <HoverText text={label} outline />
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 py-10 md:py-14 bg-white overflow-hidden">
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
      />

      {/* Header */}
      <div className="relative z-10" data-hover>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-1">
          <span className="text-orange-500">Valentin Suarez Mackeprang</span>
        </p>
        <p className="font-mono text-[11px] tracking-[0.15em] text-neutral-300 uppercase">
          <HoverText text="Buenos Aires → Madrid → Aspen → " />
          <span className="text-orange-500">London</span>
        </p>
      </div>

      {/* Centre — discipline list */}
      <div className="relative z-10 flex flex-col items-center gap-3 my-8 text-center">
        {disciplines.map((label, i) => (
          <HoverImageItem key={i} label={label} />
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between">
        <p className="font-mono text-[11px] text-orange-500 tracking-wider uppercase max-w-xs leading-relaxed" data-hover>
          Art Director & Designer.<br />
          Brand identity, campaigns,<br />
          web & AI design.
        </p>
        <div className="flex flex-col items-end gap-2">
          <a href="https://valentinsmack.com/work" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-neutral-400 hover:text-orange-500 transition-colors tracking-wider uppercase">Portfolio ↗</a>
          <a href="mailto:smack.valentin@gmail.com" className="font-mono text-[11px] text-neutral-400 hover:text-orange-500 transition-colors tracking-wider uppercase">Email ↗</a>
        </div>
      </div>
    </main>
  );
}
