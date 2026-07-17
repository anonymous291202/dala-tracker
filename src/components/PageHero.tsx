import AmbientVideoBackground from "./AmbientVideoBackground";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative pb-16 pt-40" style={{ background: "var(--void)" }}>
      <AmbientVideoBackground opacity={0.4} />
      <div className="relative mx-auto max-w-4xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--violet-bright)" }}>
          {eyebrow}
        </p>
        <h1 className="font-display text-balance mt-4 text-4xl leading-[1.05] md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-lg" style={{ color: "var(--mist-dim)" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
