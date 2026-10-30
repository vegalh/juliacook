/**
 * Attractive, reusable typographic placeholder for a book's cover, used
 * everywhere a real cover image would go (BookCard, Book Hub hero, Related
 * Stories). This app has no license to reproduce Julia Cook's actual cover
 * art, so every "cover" is this deterministic initials-on-color tile instead
 * of a photo or illustration — see docs/licensing-architecture.md.
 */
const PALETTE = [
  { bg: "bg-light-blue", text: "text-blue" },
  { bg: "bg-light-turquoise", text: "text-turquoise" },
  { bg: "bg-orange/10", text: "text-orange" },
] as const;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function initialsFor(title: string): string {
  const trimmed = title.trim();
  if (!trimmed) return "?";
  const hasCjk = /[\u3400-\u9fff]/.test(trimmed);
  if (hasCjk) return trimmed.slice(0, 2);
  const words = trimmed.split(/\s+/).filter(Boolean);
  const letters = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
  return letters || trimmed.slice(0, 2).toUpperCase();
}

interface BookCoverPlaceholderProps {
  /** Used to deterministically vary the color so a shelf of books doesn't look monotone. */
  id: string;
  title: string;
  size?: "sm" | "lg";
  className?: string;
}

export function BookCoverPlaceholder({ id, title, size = "sm", className = "" }: BookCoverPlaceholderProps) {
  const palette = PALETTE[hashString(id) % PALETTE.length];
  const initials = initialsFor(title);
  const dimensionClasses = size === "lg" ? "h-40 w-full rounded-3xl" : "h-16 w-16 rounded-xl";
  const textClasses = size === "lg" ? "text-4xl" : "text-xl";

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center ${dimensionClasses} ${palette.bg} ${palette.text} ${className}`}
    >
      <span className={`font-serif font-bold leading-none ${textClasses}`}>{initials}</span>
    </div>
  );
}
