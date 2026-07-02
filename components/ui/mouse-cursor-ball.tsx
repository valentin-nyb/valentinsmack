"use client";

import { useEffect, useRef, useState } from "react";

// Trails a short distance behind the real (OS-drawn) cursor with a lerp lag,
// so it visually reads as the hand cursor pushing the ball forward rather
// than the ball being glued to the pointer tip.
const LAG = 0.2;

export function MouseCursorBall() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const ballRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (!isFinePointer || isMobile) return;

    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!initializedRef.current) {
        ballRef.current = { x: e.clientX, y: e.clientY };
        initializedRef.current = true;
      }
    };

    const handleLeave = () => {
      initializedRef.current = false;
      setPos(null);
    };

    const tick = () => {
      if (initializedRef.current) {
        const ball = ballRef.current;
        const target = targetRef.current;
        const nextX = ball.x + (target.x - ball.x) * LAG;
        const nextY = ball.y + (target.y - ball.y) * LAG;
        const velX = nextX - ball.x;
        const velY = nextY - ball.y;
        rotRef.current += velX * 2.5 + velY * 1.0;
        ballRef.current = { x: nextX, y: nextY };
        setPos({ x: nextX, y: nextY });
        setRotation(rotRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!pos) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/gyro/8-ball.svg"
      alt=""
      width={30}
      height={30}
      className="fixed z-[90] pointer-events-none"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) translateZ(0) rotate(${rotation}deg)`,
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    />
  );
}

export default MouseCursorBall;
