"use client";

import { useEffect, useRef, useState } from "react";
import { GyroHole } from "@/components/ui/gyro-ball";

// Trails a short distance behind the real (OS-drawn) cursor with a lerp lag,
// so it visually reads as the hand cursor pushing the ball forward rather
// than the ball being glued to the pointer tip.
const LAG = 0.2;
const BALL_SIZE = 95;
const BALL_RADIUS = BALL_SIZE / 2;
const HIT_RADIUS = 56;
const FRICTION = 0.985;
const BOUNCE_DAMPING = 0.85;
const KICK_MULTIPLIER = 6;
const MIN_KICK_SPEED = 9;
const MAX_KICK_SPEED = 34;
const SETTLE_SPEED = 0.06;

const PORTFOLIO_HOLE_SIZE = 120;
const PORTFOLIO_HOLE_RADIUS = 55;
const EMAIL_HOLE_SIZE = 50;
const EMAIL_HOLE_ASPECT = 1005 / 840;
const EMAIL_HOLE_RADIUS = 24;

interface HoleTarget {
  x: number;
  y: number;
  radius: number;
  href: string;
  size: number;
  aspect: number;
  src: string;
}

interface MouseCursorBallProps {
  onHolePosition?: (pos: { x: number; y: number }) => void;
  onEmailHolePosition?: (pos: { x: number; y: number }) => void;
}

export function MouseCursorBall({ onHolePosition, onEmailHolePosition }: MouseCursorBallProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [holes, setHoles] = useState<HoleTarget[]>([]);
  const [sunk, setSunk] = useState(false);
  const ballRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef(0);
  const modeRef = useRef<"attached" | "free">("attached");
  const initializedRef = useRef(false);
  const holesRef = useRef<HoleTarget[]>([]);
  const sunkRef = useRef(false);
  const spawnTimeRef = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (!isFinePointer || isMobile) return;

    // Computed once and never repositioned afterward — reacting to viewport
    // changes (resize/scroll) made the hole visibly swim on mobile, so the
    // same static-position approach is used here.
    const portfolioHole: HoleTarget = {
      x: window.innerWidth - 130,
      y: window.innerHeight - 100,
      radius: PORTFOLIO_HOLE_RADIUS,
      href: "https://valentinsmack.myportfolio.com",
      size: PORTFOLIO_HOLE_SIZE,
      aspect: 1,
      src: "/gyro/hole.png",
    };
    const emailHole: HoleTarget = {
      x: window.innerWidth - 130,
      y: 90,
      radius: EMAIL_HOLE_RADIUS,
      href: "mailto:smack.valentin@gmail.com",
      size: EMAIL_HOLE_SIZE,
      aspect: EMAIL_HOLE_ASPECT,
      src: "/gyro/email-hole.png",
    };
    holesRef.current = [portfolioHole, emailHole];
    setHoles(holesRef.current);
    onHolePosition?.(portfolioHole);
    onEmailHolePosition?.(emailHole);

    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!initializedRef.current) {
        ballRef.current = { x: e.clientX, y: e.clientY };
        initializedRef.current = true;
        // On reload, the real cursor is often still sitting right where it
        // was when the ball last sank (e.g. hitting back after the
        // redirect), which would otherwise re-trigger the hole the instant
        // the ball spawns there. Give it a moment to actually move first.
        spawnTimeRef.current = performance.now();
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
      if (!initializedRef.current || sunkRef.current) return;
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
      if (sunkRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      let nextX: number;
      let nextY: number;

      if (modeRef.current === "attached") {
        if (!initializedRef.current) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const ball = ballRef.current;
        const target = targetRef.current;
        nextX = ball.x + (target.x - ball.x) * LAG;
        nextY = ball.y + (target.y - ball.y) * LAG;
        const velX = nextX - ball.x;
        const velY = nextY - ball.y;
        velRef.current = { x: velX, y: velY };
        rotRef.current += velX * 2.5 + velY * 1.0;
      } else {
        const ball = ballRef.current;
        const vel = velRef.current;
        nextX = ball.x + vel.x;
        nextY = ball.y + vel.y;
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
        velRef.current = { x: vx, y: vy };

        // Settled — hand it back to the cursor rather than leaving it
        // stranded on the page forever.
        if (Math.hypot(vx, vy) < SETTLE_SPEED) {
          modeRef.current = "attached";
        }
      }

      ballRef.current = { x: nextX, y: nextY };
      setPos({ x: nextX, y: nextY });
      setRotation(rotRef.current);

      const spawnGraceElapsed = performance.now() - spawnTimeRef.current > 400;
      if (spawnGraceElapsed) {
        const hitHole = holesRef.current.find(
          (hole) => Math.hypot(nextX - hole.x, nextY - hole.y) < hole.radius
        );
        if (hitHole) {
          sunkRef.current = true;
          setSunk(true);
          setTimeout(() => {
            window.location.href = hitHole.href;
          }, 400);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    // If the browser restores this page from bfcache (e.g. hitting Back
    // after the portfolio redirect) JS state resumes exactly as frozen,
    // which would otherwise leave the ball permanently sunk/invisible.
    const handlePageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      sunkRef.current = false;
      setSunk(false);
      initializedRef.current = false;
      setPos(null);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("pageshow", handlePageShow);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("pageshow", handlePageShow);
      cancelAnimationFrame(rafId);
    };
  }, [onHolePosition, onEmailHolePosition]);

  return (
    <>
      {holes.map((hole) => (
        <GyroHole
          key={hole.href}
          x={hole.x}
          y={hole.y}
          size={hole.size}
          aspect={hole.aspect}
          src={hole.src}
        />
      ))}
      {pos && (
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
            transform: `translate(-50%, -50%) translateZ(0) rotate(${rotation}deg) scale(${sunk ? 0 : 1})`,
            opacity: sunk ? 0 : 1,
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
            transition: sunk
              ? "transform 0.35s ease-in, opacity 0.35s ease-in"
              : undefined,
          }}
        />
      )}
    </>
  );
}

export default MouseCursorBall;
