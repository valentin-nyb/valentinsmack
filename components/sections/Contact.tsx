function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

const CornerMark = ({ className }: { className: string }) => (
  <span className={`absolute text-lg leading-none text-neutral-700 ${className}`}>+</span>
);

export function Contact() {
  return (
    <section id="contact" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="relative mx-auto max-w-6xl border border-neutral-600 p-10 md:p-14">
        <CornerMark className="-left-2 -top-2" />
        <CornerMark className="-right-2 -top-2" />
        <CornerMark className="-bottom-2 -left-2" />
        <CornerMark className="-bottom-2 -right-2" />

        <h2 className="font-display text-4xl font-black text-neutral-50 md:text-5xl">
          Get in touch
        </h2>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-400">
          Have a project in mind, or just want to say hello? I&apos;d love to
          hear from you — based in London, working with brands anywhere.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-8">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-neutral-800 text-neutral-300">
              <MailIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-black text-neutral-100">Email</p>
              <a
                href="mailto:smack.valentin@gmail.com"
                className="text-sm text-neutral-400 transition-colors hover:text-orange-500"
              >
                smack.valentin@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-neutral-800 text-neutral-300">
              <PinIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-black text-neutral-100">Location</p>
              <p className="text-sm text-neutral-400">London, UK</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
