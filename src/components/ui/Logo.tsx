import Image from "next/image";
import { business } from "@/lib/constants";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <Image
          src="/logo-icon.png"
          alt=""
          width={1254}
          height={1254}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-foreground">
        {business.shortName}
      </span>
    </a>
  );
}
