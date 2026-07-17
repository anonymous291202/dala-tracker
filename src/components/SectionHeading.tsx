type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--violet-bright)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-balance mt-3 text-3xl leading-[1.1] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-base md:text-lg ${align === "center" ? "mx-auto" : ""}`}
          style={{ color: "var(--mist-dim)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
