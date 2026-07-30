import { SocialDock } from "@/components/ui/social-dock";
import { DownloadCVButton } from "@/components/ui/download-cv-button";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#contact", label: "Contact" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative w-fit text-[15px] text-neutral-400 transition-colors duration-300 hover:text-neutral-100"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950/30 px-6 py-14 backdrop-blur-md md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <span
              className="text-lg font-bold uppercase tracking-tight text-neutral-100"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Valentin
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand">
              Art Director &amp; Designer based in London, working across
              brand identity, art direction, and web &amp; product design
              for fashion and retail brands.
            </p>
          </div>

          <div>
            <p className="text-[13px] tracking-[0.15em] text-neutral-500">Navigate</p>
            <nav className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[13px] tracking-[0.15em] text-neutral-500">Get in touch</p>
            <a
              href="mailto:smack.valentin@gmail.com"
              className="mt-4 block w-fit text-[15px] text-neutral-100 transition-colors hover:text-brand"
            >
              smack.valentin@gmail.com
            </a>
            <p className="mt-2 text-[13px] tracking-[0.1em] text-brand">London, UK</p>
            <div className="mt-5">
              <DownloadCVButton />
            </div>
            <div className="mt-4">
              <SocialDock />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-900 pt-6">
          <p className="text-[13px] tracking-[0.1em] text-neutral-600">
            © {new Date().getFullYear()} Valentin Suarez Mackeprang. All rights reserved.
          </p>
          <a
            href="#top"
            className="group relative text-[13px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-100"
          >
            Back to top ↑
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </footer>
  );
}
