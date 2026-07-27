export function Contact() {
  return (
    <section id="contact" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em]">
          <span className="box-decoration-clone bg-orange-500 px-1.5 py-0.5 text-neutral-950">
            Get in touch
          </span>
        </p>
        <a
          href="mailto:smack.valentin@gmail.com"
          className="mt-5 block font-serif text-2xl italic leading-tight text-neutral-50 transition-colors hover:text-orange-500 md:text-4xl"
        >
          smack.valentin@gmail.com
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-2">
          <p className="text-[13px] tracking-[0.1em] text-orange-500">London, UK</p>
        </div>
      </div>
    </section>
  );
}
