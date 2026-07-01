"use client";

import { HalftoneTrail } from "@/components/ui/halftone-trail";

export function HalftoneTrailDemo() {
  return (
    <div className="relative w-full min-h-[600px] rounded-3xl overflow-hidden bg-background border border-neutral-200">
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
    </div>
  );
}
