import Image from "next/image";
import { cn } from "@/lib/utils";

// Varied tilts + vertical offsets so the row reads as a hand-pinned, uneven stack.
const ANGLES = [-3, 4, -2, 5, -4, 3, -5, 2];
const OFFSETS = [0, 20, 8, 26, 4, 18, 12, 2];

export function PhotoMarquee({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  // Doubled so the -50% translate loops seamlessly.
  const doubled = [...images, ...images];

  return (
    <div
      aria-hidden
      className={cn(
        "w-full overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div className="animate-marquee flex w-max items-center gap-5 md:gap-6">
        {doubled.map((src, i) => (
          <figure
            key={i}
            style={{
              rotate: `${ANGLES[i % ANGLES.length]}deg`,
              marginTop: `${OFFSETS[i % OFFSETS.length]}px`,
            }}
            className="relative aspect-[16/10] w-72 shrink-0 overflow-hidden rounded-2xl bg-surface shadow-[0_18px_50px_-22px_oklch(0.3_0.01_265/0.4)] sm:w-80 md:w-[26rem]"
          >
            <Image
              src={src}
              alt=""
              fill
              quality={90}
              sizes="(max-width: 640px) 18rem, (max-width: 768px) 20rem, 26rem"
              className="object-cover object-left-top"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
