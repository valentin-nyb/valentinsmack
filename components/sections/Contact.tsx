export function Contact() {
  return (
    <section id="contact" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Get in touch</p>
        <a
          href="mailto:smack.valentin@gmail.com"
          className="mt-5 block font-serif text-4xl italic leading-tight text-neutral-50 transition-colors hover:text-orange-500 md:text-7xl"
        >
          smack.valentin@gmail.com
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-2">
          <p className="text-[13px] tracking-[0.1em] text-neutral-500">London, UK</p>
          <a
            href="https://valentinsmack.myportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-[13px] tracking-wide text-neutral-400 transition-colors hover:text-neutral-100"
          >
            Full Portfolio ↗
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
