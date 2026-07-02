"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface ScrambleHoverProps {
  text: string;
  // Index of the single character currently being "touched" by the ball
  // (mobile gyro ball or desktop cursor-trail ball) — only that letter
  // scrambles, not the whole word. Null means nothing is touching it.
  activeIndex: number | null;
  scrambleSpeed?: number;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
}

export function ScrambleHover({
  text,
  activeIndex,
  scrambleSpeed = 60,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className,
  scrambledClassName,
}: ScrambleHoverProps) {
  const [scrambledChar, setScrambledChar] = useState<{ index: number; char: string } | null>(null);
  // Locks the rendered width to the settled text's own size, so a scrambled
  // character (which can be visually wider/narrower) never resizes the
  // element out from under whatever's tracking its position.
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lockedWidth, setLockedWidth] = useState<number | null>(null);

  useEffect(() => {
    if (measureRef.current) {
      setLockedWidth(measureRef.current.offsetWidth);
    }
  }, [text, className]);

  useEffect(() => {
    if (activeIndex === null || text[activeIndex] === " ") {
      setScrambledChar(null);
      return;
    }
    const pick = () => characters[Math.floor(Math.random() * characters.length)];
    setScrambledChar({ index: activeIndex, char: pick() });
    const interval = setInterval(() => {
      setScrambledChar({ index: activeIndex, char: pick() });
    }, scrambleSpeed);
    return () => clearInterval(interval);
  }, [activeIndex, text, characters, scrambleSpeed]);

  return (
    <span
      className={cn("inline-block whitespace-nowrap", className)}
      style={lockedWidth ? { width: lockedWidth } : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((char, index) => (
          <span
            key={index}
            data-char-index={index}
            className={scrambledChar?.index === index ? scrambledClassName : undefined}
          >
            {scrambledChar?.index === index ? scrambledChar.char : char}
          </span>
        ))}
      </span>
      {/* Invisible but still laid out (visibility:hidden, not display:none),
          so offsetWidth reflects the real text's natural rendered width —
          used only to lock the visible span's width, never shown. */}
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{ position: "absolute", visibility: "hidden", whiteSpace: "pre", pointerEvents: "none" }}
      >
        {text}
      </span>
    </span>
  );
}

export default ScrambleHover;
