import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";

const base =
  "group inline-flex items-center justify-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300";

const variants: Record<Variant, string> = {
  primary:
    "rounded-[3px] bg-gradient-to-b from-accent-strong to-accent px-8 py-4 text-accent-contrast shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_36px_-12px_rgba(201,166,107,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_18px_44px_-10px_rgba(201,166,107,0.7)] hover:brightness-[1.06]",
  secondary:
    "rounded-[3px] border border-border-strong px-8 py-4 text-foreground hover:border-accent/50 hover:bg-surface",
  link: "text-foreground border-b border-foreground/25 pb-1 hover:border-accent-strong hover:text-accent-strong",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  icon = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: boolean;
}) {
  const classes = clsx(base, variants[variant], className);

  const content = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
