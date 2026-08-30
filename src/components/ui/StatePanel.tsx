import Image from "next/image";
import { PowerOff, Power } from "lucide-react";

/**
 * Shows a single Smart Film state — OFF/frosted vs ON/clear.
 * Pass `photo` to use a real installation photo; omit it to fall back to a
 * CSS-illustrated placeholder (used until real photography is available).
 */
export function StatePanel({
  state,
  photo,
}: {
  state: "off" | "on";
  photo?: string;
}) {
  const isOn = state === "on";

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] border border-border-strong bg-background-elevated">
      {photo ? (
        <Image
          src={photo}
          alt={
            isOn
              ? "Smart Film switched on: fully transparent glass"
              : "Smart Film switched off: frosted, private glass"
          }
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
          priority={false}
        />
      ) : (
        <>
          <div className="absolute inset-0">
            <div className="absolute -left-8 top-8 h-44 w-44 rounded-full bg-accent/20 blur-[60px]" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-accent-deep/25 blur-[80px]" />
            <div className="absolute left-1/4 top-1/3 h-32 w-40 rounded-2xl bg-foreground/10 blur-xl" />
          </div>

          <div className="absolute inset-5 grid grid-cols-2 grid-rows-3 gap-px">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-foreground/[0.07]" />
            ))}
          </div>

          <div
            className="absolute inset-0"
            style={{
              backdropFilter: isOn ? "blur(0px)" : "blur(26px)",
              WebkitBackdropFilter: isOn ? "blur(0px)" : "blur(26px)",
              backgroundColor: isOn
                ? "rgba(245,241,236,0)"
                : "rgba(245,241,236,0.16)",
            }}
          />
          {!isOn && <div className="grain-overlay" style={{ opacity: 0.08 }} />}
        </>
      )}

      <div className="absolute inset-x-5 bottom-5 flex items-center gap-2.5 rounded-[3px] border border-border-strong bg-background/70 px-4 py-3 backdrop-blur-md">
        {isOn ? (
          <Power size={14} className="text-accent-strong" />
        ) : (
          <PowerOff size={14} className="text-muted-dim" />
        )}
        <div>
          <div className="font-display text-sm italic text-foreground">
            {isOn ? "On — Transparent" : "Off — Frosted"}
          </div>
        </div>
      </div>
    </div>
  );
}
