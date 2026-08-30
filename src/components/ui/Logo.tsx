import Image from "next/image";
import { business } from "@/lib/constants";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-white/95 p-1">
        <Image
          src="/logo-icon.png"
          alt=""
          width={350}
          height={305}
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
