import { Volume2, Zap } from "lucide-react";

interface GuidanceCardProps {
  title: string;
  description: string;
  quote: string;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

export function GuidanceCard({ title, description, quote }: GuidanceCardProps) {
  return (
    <div className="rounded-3xl bg-light-peach p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-orange">
        <Zap size={20} className="text-white" fill="white" />
      </div>
      <h2 className="font-serif text-xl font-bold text-navy">{title}</h2>
      <p className="mt-1 text-sm text-navy/80">{description}</p>

      <div className="mt-4 flex items-start justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Try saying</p>
          <p className="mt-1 font-serif text-base leading-snug text-navy">{quote}</p>
        </div>
        <button
          type="button"
          aria-label="Read quote aloud"
          onClick={() => speak(quote)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light-turquoise text-turquoise"
        >
          <Volume2 size={18} />
        </button>
      </div>
    </div>
  );
}
