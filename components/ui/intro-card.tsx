import type { ReactNode } from "react";

interface IntroCardProps {
  avatarSrc: string;
  name: string;
  role: string;
  message: ReactNode;
  email: string;
}

export function IntroCard({ avatarSrc, name, role, message, email }: IntroCardProps) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-lg backdrop-blur-sm">
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt={name}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-neutral-100">{name}</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-brand">
            {role}
          </p>

          <div className="mt-3 rounded-lg rounded-tl-none bg-neutral-800 p-3 text-sm leading-relaxed text-neutral-300">
            {message}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
            <span>5 mins</span>
            <span>&middot;</span>
            <span>Read</span>
            <span aria-hidden>✓</span>
          </div>
        </div>

        <a
          href={`mailto:${email}`}
          aria-label="Email me"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-brand/10 hover:text-brand"
        >
          ➤
        </a>
      </div>
    </div>
  );
}
