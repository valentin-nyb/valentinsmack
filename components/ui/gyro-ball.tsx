"use client";

interface GyroBallProps {
  x: number;
  y: number;
  rotation?: number;
  sunk?: boolean;
}

export function GyroBall({ x, y, rotation = 0, sunk = false }: GyroBallProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/gyro/8-ball.svg"
      alt=""
      width={56}
      height={56}
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateZ(0) rotate(${rotation}deg) scale(${sunk ? 0 : 1})`,
        opacity: sunk ? 0 : 1,
        zIndex: 50,
        pointerEvents: "none",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
        transition: sunk
          ? "transform 0.35s ease-in, opacity 0.35s ease-in"
          : "transform 0.016s linear",
      }}
    />
  );
}

interface GyroHoleProps {
  x: number;
  y: number;
  size?: number;
  aspect?: number;
  src?: string;
}

export function GyroHole({ x, y, size = 64, aspect = 1, src = "/gyro/hole.png" }: GyroHoleProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={Math.round(size * aspect)}
      height={size}
      className="fixed pointer-events-none z-40"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%) translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    />
  );
}
