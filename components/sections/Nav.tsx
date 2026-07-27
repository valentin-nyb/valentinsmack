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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="text-lg font-bold uppercase tracking-tight text-neutral-100"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Valentin
        </a>
        <nav className="flex items-center gap-8 md:gap-10">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </header>
  );
}
