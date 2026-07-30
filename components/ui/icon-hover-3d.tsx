"use client";

import React, { useEffect, useState, useId } from "react";
import {
  m,
  MotionConfigContext,
  LayoutGroup,
  type Transition as MotionTransition,
  type TransformTemplate,
} from "framer-motion";

interface Props {
  heading?: string;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  /** Icon-on-top, text below (bento card) instead of icon-left/text-right. */
  vertical?: boolean;
  /** Center everything (icon + heading + text) instead of left-aligned. */
  centered?: boolean;
  /** Circular halo-ringed icon container instead of the bordered square. */
  ringed?: boolean;
  /** Icon size in px (defaults to 100, or 120 when vertical). */
  iconSize?: number;
}

const BG = "#0a0a0a";
const FG = "#fafafa";
const ACCENT = "#f0803c";

const transition1: MotionTransition = {
  bounce: 0,
  delay: 0,
  duration: 0.4,
  type: "spring",
};

const titleTransition: MotionTransition = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94],
  type: "tween",
};

const transformTemplate1: TransformTemplate = (_transform, generated) =>
  `translate(-50%, -50%) ${generated}`;

const Transition: React.FC<{ value: MotionTransition; children: React.ReactNode }> = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [config, transition]);

  return <MotionConfigContext.Provider value={contextValue}>{children}</MotionConfigContext.Provider>;
};

const Variants = m.create(React.Fragment);

// Fewer, wider-spaced layers reach the same depth/brightness range as
// the original 14-layer version with less render/hydration work — this
// component mounts 5x on the page (once per service) on initial load.
const EXTRUSION_LAYERS = 8;

/** Stacks copies of a flat icon at incremental Z-depths with a brightness
 * falloff, so it reads as a solid extruded volume once rotated in 3D
 * rather than a flat plane tilted in space. */
function ExtrudedIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <>
      {Array.from({ length: EXTRUSION_LAYERS }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateZ(${-i * 5.5}px)`,
            filter: `brightness(${1 - i * 0.083})`,
          }}
        >
          {icon}
        </div>
      ))}
    </>
  );
}

export const IconHover3D: React.FC<Props> = ({
  heading,
  text,
  icon,
  className = "",
  style = {},
  width = "100%",
  height = "auto",
  vertical = false,
  centered = false,
  ringed = false,
  iconSize,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const defaultLayoutId = useId();
  const variants = [isHover ? "hover" : "default"];

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <div style={{ width, height }}>
      <LayoutGroup id={defaultLayoutId}>
        <Variants animate={variants} initial={false}>
          <Transition value={transition1}>
            <m.div
              className={`icon-hover-3d ${className}`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                alignItems: centered ? "center" : vertical || isMobile ? "flex-start" : "center",
                display: "flex",
                flexDirection: vertical || isMobile ? "column" : "row",
                flexWrap: "nowrap",
                gap: vertical ? "24px" : isMobile ? "16px" : "32px",
                justifyContent: centered ? "center" : "flex-start",
                height: "100%",
                boxSizing: "border-box",
                overflow: "visible",
                padding: isMobile ? "18px" : "24px",
                position: "relative",
                width: "100%",
                cursor: "pointer",
                ...style,
              }}
            >
              {/* Icon */}
              <m.div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flex: "none",
                  justifyContent: "center",
                  height: iconSize ?? (vertical ? 120 : 100),
                  width: iconSize ?? (vertical ? 120 : 100),
                  position: "relative",
                  zIndex: 1,
                  border: "1px solid rgba(250,250,250,0.2)",
                  borderRadius: ringed ? "9999px" : "8px",
                  boxShadow: ringed ? "0 0 0 8px rgba(250,250,250,0.05)" : undefined,
                }}
              >
                <m.div
                  style={{
                    flex: "none",
                    height: "348px",
                    overflow: "visible",
                    position: "relative",
                    width: "348px",
                    zIndex: 2,
                    scale: 0.3,
                  }}
                >
                  {icon && (
                    <m.div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "280px",
                        height: "280px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isHover ? ACCENT : FG,
                        transformStyle: "preserve-3d",
                        zIndex: 3,
                        transformPerspective: 1200,
                        transition: "color 0.4s ease",
                      }}
                      transformTemplate={transformTemplate1}
                      animate={{
                        rotate: isHover ? -28 : 49,
                        rotateX: isHover ? -28 : 23,
                        rotateY: isHover ? -43 : 33,
                        scale: isHover ? 1.1 : 0.7,
                      }}
                    >
                      <ExtrudedIcon icon={icon} />
                    </m.div>
                  )}

                </m.div>
              </m.div>

              {/* Content */}
              {(heading || text) && (
                <m.div
                  style={{
                    alignItems: centered ? "center" : "flex-start",
                    display: "flex",
                    flex: vertical || isMobile ? "1 1 auto" : "none",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "center",
                    width: vertical ? "100%" : undefined,
                    maxWidth: vertical || isMobile ? "100%" : "380px",
                    minWidth: 0,
                    overflow: "hidden",
                    position: "relative",
                    textAlign: centered ? "center" : "left",
                  }}
                >
                  {heading && (
                    <m.div
                      style={{
                        height: "28px",
                        position: "relative",
                        width: "auto",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700,
                        fontSize: "20px",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: centered ? "center" : "flex-start",
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ position: "relative", zIndex: 1, color: FG }}>{heading}</span>
                      <m.span
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: BG,
                          clipPath: `inset(0 ${isHover ? 0 : 100}% 0 0)`,
                          zIndex: 2,
                        }}
                        animate={{ clipPath: `inset(0 ${isHover ? 0 : 100}% 0 0)` }}
                        transition={titleTransition}
                      >
                        {heading}
                      </m.span>
                      <m.div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: ACCENT,
                          transformOrigin: "left center",
                          zIndex: 1,
                        }}
                        animate={{ scaleX: isHover ? 1 : 0 }}
                        transition={titleTransition}
                      />
                    </m.div>
                  )}

                  {text && (
                    <m.div
                      style={{
                        position: "relative",
                        whiteSpace: "pre-wrap",
                        width: "100%",
                        wordBreak: "break-word",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "1.5em",
                        color: "rgba(250,250,250,0.6)",
                        userSelect: "none",
                      }}
                    >
                      {text}
                    </m.div>
                  )}
                </m.div>
              )}
            </m.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};
