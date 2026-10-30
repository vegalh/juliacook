import { BookOpen, Play, Printer, Puzzle } from "lucide-react";
import { useEffect } from "react";
import { useFilters } from "../context/FilterContext";
import { settingLabel, skillLabel, typeLabel } from "../data/labels";
import { useLocale } from "../i18n";
import type { ResourceType, Setting, Skill } from "../types";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onShowResults: () => void;
}

const contentTypes: { value: ResourceType; icon: typeof Play }[] = [
  { value: "video", icon: Play },
  { value: "activity", icon: Puzzle },
  { value: "book", icon: BookOpen },
  { value: "printable", icon: Printer },
];

const settings: Setting[] = ["home", "classroom", "both"];

const skills: Skill[] = [
  "emotions",
  "communication",
  "friendship",
  "self-control",
  "empathy",
  "problem-solving",
];

export function FilterModal({ open, onClose, onShowResults }: FilterModalProps) {
  const { locale, t } = useLocale();
  const { filters, toggleType, toggleSkill, setSetting, reset } = useFilters();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-end">
      <button
        type="button"
        aria-label={t("common.back")}
        onClick={onClose}
        className="absolute inset-0 bg-navy/40"
      />
      <div className="no-scrollbar relative z-10 max-h-[85%] w-full overflow-y-auto rounded-t-3xl bg-white p-5 pb-8">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/10" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-navy">{t("common.filter")}</h2>
          <button type="button" onClick={reset} className="text-sm font-medium text-blue">
            {t("common.reset")}
          </button>
        </div>

        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            {t("library.byType")}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {contentTypes.map(({ value, icon: Icon }) => {
              const selected = filters.types.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleType(value)}
                  className={`flex min-h-11 flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-medium transition-colors ${
                    selected ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                  }`}
                >
                  <Icon size={20} />
                  {typeLabel(value, locale)}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            {t("common.setting")}
          </h3>
          <div className="flex gap-2">
            {settings.map((value) => {
              const selected = filters.setting === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSetting(value)}
                  className={`min-h-11 flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
                    selected ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                  }`}
                >
                  {settingLabel(value, locale)}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            {t("common.skillArea")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((value) => {
              const selected = filters.skills.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleSkill(value)}
                  className={`min-h-11 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    selected ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                  }`}
                >
                  {skillLabel(value, locale)}
                </button>
              );
            })}
          </div>
        </section>

        <button
          type="button"
          onClick={onShowResults}
          className="min-h-11 w-full rounded-full bg-blue py-3.5 text-base font-semibold text-white"
        >
          {t("common.showResults")}
        </button>
      </div>
    </div>
  );
}
