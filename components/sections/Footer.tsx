export function Footer() {
  return (
    <footer className="border-t border-neutral-900 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="text-[13px] tracking-[0.1em] text-neutral-600">
          © {new Date().getFullYear()} Valentin Suarez Mackeprang
        </p>
        <a
          href="#top"
          className="group relative text-[13px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-100"
        >
          Back to top ↑
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </a>
      </div>
    </footer>
  );
}
