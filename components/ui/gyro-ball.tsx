"use client";

interface GyroBallProps {
  x: number;
  y: number;
  rotation?: number;
}

export function GyroBall({ x, y, rotation = 0 }: GyroBallProps) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 16 16"
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        imageRendering: "pixelated",
        zIndex: 50,
        pointerEvents: "none",
        transition: "transform 0.016s linear",
      }}
    >
      {/* Outer shadow rim */}
      <rect x="4" y="0" width="8" height="1" fill="#0a0a0a" />
      <rect x="2" y="1" width="12" height="1" fill="#0a0a0a" />
      <rect x="1" y="2" width="1" height="12" fill="#0a0a0a" />
      <rect x="14" y="2" width="1" height="12" fill="#0a0a0a" />
      <rect x="2" y="14" width="12" height="1" fill="#0a0a0a" />
      <rect x="4" y="15" width="8" height="1" fill="#0a0a0a" />

      {/* Ball body — black */}
      <rect x="2" y="2" width="12" height="12" fill="#111111" />
      <rect x="1" y="3" width="1" height="10" fill="#111111" />
      <rect x="14" y="3" width="1" height="10" fill="#111111" />
      <rect x="3" y="1" width="10" height="1" fill="#111111" />
      <rect x="3" y="14" width="10" height="1" fill="#111111" />

      {/* Shadow bottom-right */}
      <rect x="7" y="9" width="6" height="4" fill="#000000" />
      <rect x="6" y="10" width="7" height="3" fill="#000000" />
      <rect x="5" y="11" width="8" height="2" fill="#000000" />
      <rect x="4" y="12" width="9" height="2" fill="#000000" />

      {/* Highlight top-left — grey sheen */}
      <rect x="3" y="3" width="3" height="1" fill="#555555" />
      <rect x="3" y="4" width="4" height="1" fill="#444444" />
      <rect x="3" y="5" width="2" height="1" fill="#333333" />
      <rect x="3" y="3" width="1" height="1" fill="#888888" />
      <rect x="4" y="3" width="1" height="1" fill="#aaaaaa" />
      {/* Bright specular pixel */}
      <rect x="4" y="2" width="1" height="1" fill="#ffffff" />

      {/* White circle centre */}
      <rect x="5" y="5" width="6" height="6" fill="#ffffff" />
      <rect x="4" y="6" width="1" height="4" fill="#ffffff" />
      <rect x="11" y="6" width="1" height="4" fill="#ffffff" />
      <rect x="6" y="4" width="4" height="1" fill="#ffffff" />
      <rect x="6" y="11" width="4" height="1" fill="#ffffff" />
      {/* Round off white circle corners */}
      <rect x="5" y="5" width="1" height="1" fill="#111111" />
      <rect x="10" y="5" width="1" height="1" fill="#111111" />
      <rect x="5" y="10" width="1" height="1" fill="#000000" />
      <rect x="10" y="10" width="1" height="1" fill="#000000" />

      {/* Pixel "8" inside white circle */}
      {/* Top curve of 8 */}
      <rect x="7" y="5" width="2" height="1" fill="#111111" />
      <rect x="6" y="6" width="1" height="1" fill="#111111" />
      <rect x="9" y="6" width="1" height="1" fill="#111111" />
      {/* Middle bar */}
      <rect x="6" y="7" width="4" height="1" fill="#111111" />
      {/* Bottom curve of 8 */}
      <rect x="6" y="8" width="1" height="1" fill="#111111" />
      <rect x="9" y="8" width="1" height="1" fill="#111111" />
      <rect x="7" y="9" width="2" height="1" fill="#111111" />
    </svg>
  );
}
