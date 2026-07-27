"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#contact", label: "Contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative py-1 text-[13px] tracking-wide text-neutral-400 transition-colors duration-300 hover:text-neutral-100"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#top"
            className="text-lg font-bold uppercase tracking-tight text-neutral-100"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            Valentin
          </a>

          <nav className="hidden items-center gap-8 md:flex md:gap-10">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="h-px w-6 bg-neutral-100" />
            <span className="h-px w-6 bg-neutral-100" />
          </button>
        </div>
      </header>

      {/* Rendered as a sibling, not nested inside <header> — an ancestor
          with backdrop-filter becomes a containing block for fixed
          descendants, which would confine this to the header's own
          height instead of the full viewport. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col bg-neutral-950 md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span
                className="text-lg font-bold uppercase tracking-tight text-neutral-100"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                Valentin
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-[13px] tracking-wide text-neutral-400"
              >
                Close ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl font-black text-neutral-100 transition-colors hover:text-orange-500"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
