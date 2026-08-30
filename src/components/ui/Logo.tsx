import { business } from "@/lib/constants";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] border border-accent/40">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 0H14V14" stroke="var(--accent)" strokeWidth="1" />
          <path
            d="M0 14L14 0"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
      </span>
      <span className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-foreground">
        {business.shortName}
      </span>
    </a>
  );
}
