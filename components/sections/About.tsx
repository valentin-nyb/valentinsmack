import { Reveal } from "@/components/ui/reveal";

const disciplines = [
  "Brand & Identity",
  "Art Direction",
  "Web & Product",
  "Photography",
  "Campaigns",
];

export function About() {
  return (
    <section id="about" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[auto_1fr] md:gap-16">
        <Reveal>
          <h2 className="text-[13px] tracking-[0.15em] text-neutral-500">About</h2>
        </Reveal>
        <Reveal delay={0.1} className="max-w-2xl">
          <p className="font-serif text-2xl leading-relaxed md:text-3xl">
            <span className="box-decoration-clone bg-brand px-1.5 py-0.5 text-neutral-950">
              Art Director and Designer based in London. Brand identity, art
              direction, web design and development — for fashion, retail,
              and brands that move culture. Fast, editorial, typography-led,
              hands-on from concept to code.
            </span>
          </p>
          <p className="mt-4 text-[13px] tracking-[0.1em] text-brand">
            Buenos Aires — Madrid — Aspen — London
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3 text-[13px] tracking-wide text-neutral-400">
            {disciplines.map((d, i) => (
              <li key={d} className="flex items-center gap-3">
                {d}
                {i < disciplines.length - 1 && (
                  <span className="text-neutral-700">/</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
