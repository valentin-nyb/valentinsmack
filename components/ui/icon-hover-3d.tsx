"use client";

import React, { useState, useId } from "react";
import {
  motion,
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
}

const BG = "#0a0a0a";
const FG = "#fafafa";
const ACCENT = "#f97316";

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

const Variants = motion.create(React.Fragment);

const EXTRUSION_LAYERS = 14;

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
            transform: `translateZ(${-i * 3}px)`,
            filter: `brightness(${1 - i * 0.045})`,
          }}
        >
          {icon}
        </div>
      ))}
    </>
  );
}

export const IconHover3D: React.FC<Props> = ({
  heading = "Library",
  text = "A comprehensive collection of digital books and resources for learning and research.",
  icon,
  className = "",
  style = {},
  width = "100%",
  height = "auto",
}) => {
  const [isHover, setIsHover] = useState(false);
  const defaultLayoutId = useId();
  const variants = [isHover ? "hover" : "default"];

  return (
    <div style={{ width, height }}>
      <LayoutGroup id={defaultLayoutId}>
        <Variants animate={variants} initial={false}>
          <Transition value={transition1}>
            <motion.div
              className={`icon-hover-3d ${className}`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                backgroundColor: BG,
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "32px",
                justifyContent: "flex-start",
                overflow: "visible",
                padding: "24px",
                position: "relative",
                width: "100%",
                borderRadius: "12px",
                border: "1px solid rgba(250,250,250,0.1)",
                cursor: "pointer",
                ...style,
              }}
            >
              {/* Icon */}
              <motion.div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flex: "none",
                  justifyContent: "center",
                  height: "100px",
                  width: "100px",
                  position: "relative",
                  zIndex: 1,
                  border: "1px solid rgba(250,250,250,0.2)",
                  borderRadius: "8px",
                }}
              >
                <motion.div
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
                    <motion.div
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
                    </motion.div>
                  )}

                  {/* Corner brackets */}
                  <motion.div
                    animate={{ left: isHover ? -6 : 14, top: isHover ? -6 : 14, scale: isHover ? 2.2 : 1 }}
                    style={{
                      flex: "none",
                      height: "24px",
                      overflow: "hidden",
                      position: "absolute",
                      width: "24px",
                      zIndex: 2,
                      borderLeft: `4px solid ${isHover ? ACCENT : FG}`,
                      borderTop: `4px solid ${isHover ? ACCENT : FG}`,
                    }}
                  />
                  <motion.div
                    animate={{ left: isHover ? -6 : 14, top: isHover ? 330 : 310, scale: isHover ? 2.2 : 1 }}
                    style={{
                      flex: "none",
                      height: "24px",
                      overflow: "hidden",
                      position: "absolute",
                      width: "24px",
                      zIndex: 2,
                      borderLeft: `4px solid ${isHover ? ACCENT : FG}`,
                      borderBottom: `4px solid ${isHover ? ACCENT : FG}`,
                    }}
                  />
                  <motion.div
                    animate={{ right: isHover ? -6 : 14, bottom: isHover ? -6 : 14, scale: isHover ? 2.2 : 1 }}
                    style={{
                      flex: "none",
                      height: "24px",
                      overflow: "hidden",
                      position: "absolute",
                      width: "24px",
                      zIndex: 2,
                      borderRight: `4px solid ${isHover ? ACCENT : FG}`,
                      borderBottom: `4px solid ${isHover ? ACCENT : FG}`,
                    }}
                  />
                  <motion.div
                    animate={{ right: isHover ? -6 : 14, top: isHover ? -6 : 14, scale: isHover ? 2.2 : 1 }}
                    style={{
                      flex: "none",
                      height: "24px",
                      overflow: "hidden",
                      position: "absolute",
                      width: "24px",
                      zIndex: 2,
                      borderRight: `4px solid ${isHover ? ACCENT : FG}`,
                      borderTop: `4px solid ${isHover ? ACCENT : FG}`,
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  flex: "none",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "center",
                  maxWidth: "380px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  style={{
                    height: "28px",
                    position: "relative",
                    width: "auto",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1, color: FG }}>{heading}</span>
                  <motion.span
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
                  </motion.span>
                  <motion.div
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
                </motion.div>

                <motion.div
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
                </motion.div>
              </motion.div>
            </motion.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};
