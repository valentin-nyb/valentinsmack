import { process } from "@/lib/content";

export function Process() {
  return (
    <section className="border-t border-neutral-900 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Process</p>
        <div className="mt-12 grid gap-10 md:grid-cols-4 md:gap-10">
          {process.map((p) => (
            <div key={p.step} className="border-t border-neutral-900 pt-8">
              <span className="font-serif italic text-neutral-600">{p.step}</span>
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
