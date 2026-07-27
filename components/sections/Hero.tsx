export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center px-6 pt-24 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-3 text-[13px] tracking-[0.15em] text-neutral-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
          Art Director &amp; Designer — London
        </p>
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-black leading-[1.05] tracking-tight text-neutral-50 md:text-7xl lg:text-[5.5rem]">
          Brand and digital direction for{" "}
          <span className="font-serif italic font-normal text-neutral-400">
            fashion, retail,
          </span>{" "}
          and the brands that move culture.
        </h1>
        <p className="mt-10 max-w-lg font-serif text-xl leading-relaxed text-neutral-400">
          I&apos;m Valentin Suarez Mackeprang — working across brand identity,
          art direction, and web &amp; product design. Raised between Buenos
          Aires, Madrid, and Aspen, now based in London.
        </p>
        <div className="mt-12 flex items-center gap-10">
          <a
            href="#work"
            className="group relative text-[13px] tracking-wide text-neutral-100"
          >
            View Work
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
          <a
            href="mailto:smack.valentin@gmail.com"
            className="group relative text-[13px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-100"
          >
            Email
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
