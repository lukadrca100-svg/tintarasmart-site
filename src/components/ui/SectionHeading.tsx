import { type ReactNode } from "react";
import clsx from "clsx";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div className={clsx(align === "center" && "flex justify-center")}>
        <div className="kicker">{kicker}</div>
      </div>
      <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
