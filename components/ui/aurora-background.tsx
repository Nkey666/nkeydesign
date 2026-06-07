import { cn } from "@/lib/utils";

/**
 * Ambient backdrop — a clean white field with a barely-there neutral light wash
 * (fixed, -z-10). No color tint: the page reads as white, accents stay terracotta.
 * Pure CSS: reduced-motion is handled globally in globals.css.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-fx pointer-events-none absolute -inset-[10px] opacity-50 [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]" />
      </div>
    </div>
  );
}
