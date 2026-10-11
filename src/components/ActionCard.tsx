import type { ReactNode } from "react";

interface ActionCardProps {
  variant: "compact" | "large";
  icon: ReactNode;
  iconBgClassName: string;
  title: string;
  description: string;
  thumbnail?: ReactNode;
  onClick?: () => void;
}

export function ActionCard({
  variant,
  icon,
  iconBgClassName,
  title,
  description,
  thumbnail,
  onClick,
}: ActionCardProps) {
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-11 flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
      >
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgClassName}`}>
          {icon}
        </span>
        <span className="font-serif text-sm font-bold text-navy">{title}</span>
        <span className="text-xs text-muted">{description}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-[0_2px_14px_rgba(23,43,77,0.07)]"
    >
      <div className="min-w-0 flex-1">
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgClassName}`}>
          {icon}
        </span>
        <h3 className="mt-3 font-serif text-lg font-bold text-navy">{title}</h3>
        <p className="mt-1 text-sm leading-snug text-navy/70">{description}</p>
      </div>
      {thumbnail && <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">{thumbnail}</div>}
    </button>
  );
}
