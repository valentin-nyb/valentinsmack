import { IntroCard } from "@/components/ui/intro-card";

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[85vh] flex-col justify-center px-6 pt-28 md:px-10 md:pt-36"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-3 text-[13px] tracking-[0.15em] text-orange-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
          Art Director &amp; Designer — London
        </p>
        <h1 className="mt-2 max-w-4xl font-display text-5xl font-black leading-[1.05] tracking-tight text-neutral-50 md:text-7xl lg:text-[5.5rem]">
          brand strategy and{" "}
          <span className="rounded bg-[#f0803c] px-1 text-neutral-950">
            art direction
          </span>{" "}
          for{" "}
          <span className="font-serif italic font-normal text-neutral-400 text-[1.15em]">
            clothing
          </span>
          ,{" "}
          <span className="font-serif italic font-normal text-neutral-400 text-[1.15em]">
            retail
          </span>{" "}
          &amp;{" "}
          <span className="font-serif italic font-normal text-neutral-400 text-[1.15em]">
            experiential
          </span>
          .
          <span className="block">— built to move culture and move product.</span>
        </h1>
        <div className="mt-6 hidden md:block">
          <IntroCard
            avatarSrc="/avatar.webp"
            name="Valentin Suarez Mackeprang"
            role="Art Director & Designer"
            message={
              <>
                I&apos;m Valentin Suarez Mackeprang — working across Art
                Direction, Brand Identity and Web Design. I&apos;ve been
                living and working between Buenos Aires, Madrid and Aspen,{" "}
                <span className="rounded bg-[#f0803c] px-1 text-neutral-950">
                  now based in London.
                </span>
              </>
            }
            email="smack.valentin@gmail.com"
          />
        </div>
        <div className="mt-8 flex items-center gap-10">
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
