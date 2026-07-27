import { process } from "@/lib/content";

export function Process() {
  return (
    <section className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Process</p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:divide-x md:divide-neutral-900">
          {process.map((p) => (
            <div key={p.step} className="border-t border-neutral-900 pt-5 md:flex-1 md:border-t-0 md:pl-8 md:pt-0 md:first:pl-0">
              <span className="font-serif text-lg font-bold italic text-orange-500">{p.step}</span>
              <h3 className="mt-3 font-display text-lg font-black text-neutral-100">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
