"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LinkPreviewProps {
  children: React.ReactNode;
  url: string;
  label?: string;
}

export function LinkPreview({ children, url, label }: LinkPreviewProps) {
  const [open, setOpen] = useState(false);
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <HoverCard.Root openDelay={50} closeDelay={100} onOpenChange={setOpen}>
      <HoverCard.Trigger asChild>
        <span className="cursor-pointer">{children}</span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content side="top" align="start" sideOffset={12}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl"
                style={{ width: 260, height: 160, background: "#111" }}
              >
                <img
                  src={screenshotUrl}
                  alt={label || url}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
