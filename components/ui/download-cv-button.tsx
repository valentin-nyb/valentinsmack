function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 4v13" strokeLinecap="round" />
      <path d="M6 12l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadCVButton() {
  return (
    <a
      href="/cv.pdf"
      download
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-100/40 px-6 py-3 text-[13px] tracking-wide text-neutral-100 transition-colors duration-300 hover:border-brand"
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100" />

      <span className="relative h-4 w-4 overflow-hidden">
        <ArrowDownIcon className="absolute inset-0 h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-5 group-hover:text-neutral-950" />
        <ArrowDownIcon className="absolute inset-0 h-4 w-4 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-y-0 group-hover:text-neutral-950" />
      </span>

      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-5 group-hover:text-neutral-950">
          Download CV
        </span>
        <span className="absolute inset-0 block translate-y-5 text-neutral-950 transition-transform duration-300 ease-out group-hover:translate-y-0">
          Download CV
        </span>
      </span>
    </a>
  );
}
