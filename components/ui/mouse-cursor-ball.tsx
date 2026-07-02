"use client";

import { useEffect, useRef, useState } from "react";

// Trails a short distance behind the real (OS-drawn) cursor with a lerp lag,
// so it visually reads as the hand cursor pushing the ball forward rather
// than the ball being glued to the pointer tip.
const LAG = 0.2;
const BALL_SIZE = 86;
const BALL_RADIUS = BALL_SIZE / 2;
const HIT_RADIUS = 56;
const FRICTION = 0.985;
const BOUNCE_DAMPING = 0.85;
const KICK_MULTIPLIER = 6;
const MIN_KICK_SPEED = 9;
const MAX_KICK_SPEED = 34;
const SETTLE_SPEED = 0.06;

export function MouseCursorBall() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const ballRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef(0);
  const modeRef = useRef<"attached" | "free">("attached");
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
      if (modeRef.current === "attached") {
        initializedRef.current = false;
        setPos(null);
      }
    };

    // Doesn't preventDefault/stopPropagation, so clicks on links/buttons
    // still work as normal — this just piggybacks a hit-test on top.
    const handleClick = (e: MouseEvent) => {
      if (!initializedRef.current || modeRef.current === "free") return;
      const ball = ballRef.current;
      if (Math.hypot(e.clientX - ball.x, e.clientY - ball.y) > HIT_RADIUS) return;

      const vel = velRef.current;
      const speed = Math.hypot(vel.x, vel.y);
      const angle = speed > 0.5 ? Math.atan2(vel.y, vel.x) : Math.random() * Math.PI * 2;
      const mag = Math.min(Math.max(speed * KICK_MULTIPLIER, MIN_KICK_SPEED), MAX_KICK_SPEED);
      velRef.current = { x: Math.cos(angle) * mag, y: Math.sin(angle) * mag };
      modeRef.current = "free";
    };

    const tick = () => {
      if (modeRef.current === "attached") {
        if (initializedRef.current) {
          const ball = ballRef.current;
          const target = targetRef.current;
          const nextX = ball.x + (target.x - ball.x) * LAG;
          const nextY = ball.y + (target.y - ball.y) * LAG;
          const velX = nextX - ball.x;
          const velY = nextY - ball.y;
          velRef.current = { x: velX, y: velY };
          rotRef.current += velX * 2.5 + velY * 1.0;
          ballRef.current = { x: nextX, y: nextY };
          setPos({ x: nextX, y: nextY });
          setRotation(rotRef.current);
        }
      } else {
        const ball = ballRef.current;
        const vel = velRef.current;
        let nextX = ball.x + vel.x;
        let nextY = ball.y + vel.y;
        let vx = vel.x * FRICTION;
        let vy = vel.y * FRICTION;

        const minX = BALL_RADIUS;
        const maxX = window.innerWidth - BALL_RADIUS;
        const minY = BALL_RADIUS;
        const maxY = window.innerHeight - BALL_RADIUS;
        if (nextX < minX) {
          nextX = minX;
          vx = -vx * BOUNCE_DAMPING;
        } else if (nextX > maxX) {
          nextX = maxX;
          vx = -vx * BOUNCE_DAMPING;
        }
        if (nextY < minY) {
          nextY = minY;
          vy = -vy * BOUNCE_DAMPING;
        } else if (nextY > maxY) {
          nextY = maxY;
          vy = -vy * BOUNCE_DAMPING;
        }

        rotRef.current += vx * 2.5 + vy * 1.0;
        ballRef.current = { x: nextX, y: nextY };
        velRef.current = { x: vx, y: vy };
        setPos({ x: nextX, y: nextY });
        setRotation(rotRef.current);

        // Settled — hand it back to the cursor rather than leaving it
        // stranded on the page forever.
        if (Math.hypot(vx, vy) < SETTLE_SPEED) {
          modeRef.current = "attached";
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
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
      width={BALL_SIZE}
      height={BALL_SIZE}
      className="fixed z-[5] pointer-events-none"
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
