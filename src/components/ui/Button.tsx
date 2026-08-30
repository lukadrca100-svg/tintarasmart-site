import Link from "next/link";
import clsx from "clsx";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-accent-strong to-accent text-accent-contrast shadow-[0_8px_30px_-8px_rgba(201,166,107,0.55)] hover:shadow-[0_8px_40px_-6px_rgba(201,166,107,0.75)] hover:brightness-110",
  secondary:
    "border border-border-strong text-foreground hover:bg-surface-hover",
  ghost: "text-foreground hover:text-accent-strong",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
