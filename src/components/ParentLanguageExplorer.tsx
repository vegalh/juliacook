import { ArrowRight, MessageCircle, Volume2 } from "lucide-react";
import { useState } from "react";
import type { LanguageOption, LanguageScenario } from "../data/languageScenarios";
import { useLocale } from "../i18n";
import { speak } from "../utils/speak";

type OptionKey = "A" | "B";

interface ParentLanguageExplorerProps {
  scenario: LanguageScenario;
  /** Shown as a "next scenario" action, e.g. to cycle through a list. Hidden if omitted. */
  onNextScenario?: () => void;
  className?: string;
}

/**
 * Reusable "换一种说法" interactive card: a parent reads a situation, picks
 * one of two realistic responses, and sees a non-judgmental reflection on
 * what it might communicate — with the ability to compare the other
 * response or move to a different scenario. See docs/content-model.md.
 */
export function ParentLanguageExplorer({
  scenario,
  onNextScenario,
  className = "",
}: ParentLanguageExplorerProps) {
  const { locale, t } = useLocale();
  const [selected, setSelected] = useState<OptionKey | null>(null);
  // Tracks which scenario the current selection belongs to, so switching to
  // a new scenario clears the pick without needing an effect (adjusting
  // state during render, per React's "you might not need an effect" guidance).
  const [selectionScenarioId, setSelectionScenarioId] = useState(scenario.id);
  if (scenario.id !== selectionScenarioId) {
    setSelectionScenarioId(scenario.id);
    setSelected(null);
  }
  const speechLang = locale === "zh" ? "zh-CN" : "en-US";

  const options: Record<OptionKey, LanguageOption> = { A: scenario.optionA, B: scenario.optionB };

  const localizedText = (option: LanguageOption) => (locale === "zh" ? option.textZh : option.text);
  const localizedField = (option: LanguageOption, field: "communicates" | "childInterprets" | "cooperationNote") =>
    locale === "zh" ? option[`${field}Zh` as const] : option[field];

  const selectedOption = selected ? options[selected] : null;
  const alternativeText = selectedOption
    ? locale === "zh"
      ? selectedOption.alternativeZh
      : selectedOption.alternative
    : undefined;

  return (
    <div className={`rounded-3xl bg-white p-5 shadow-[0_4px_18px_rgba(23,43,77,0.08)] ${className}`}>
      <div className="flex items-start gap-2 rounded-2xl bg-light-blue px-4 py-3">
        <MessageCircle size={18} className="mt-0.5 shrink-0 text-blue" />
        <p className="text-sm leading-relaxed text-navy">
          {locale === "zh" ? scenario.situationLineZh : scenario.situationLine}
        </p>
      </div>

      <p className="mt-4 font-serif text-lg font-bold text-navy">{t("explorer.prompt")}</p>
      {!selected && <p className="mt-1 text-xs text-muted">{t("explorer.selectPrompt")}</p>}

      <div className="mt-3 flex flex-col gap-2.5">
        {(["A", "B"] as const).map((key) => {
          const option = options[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              aria-pressed={isSelected}
              className={`min-h-11 rounded-2xl border px-4 py-3.5 text-left text-sm leading-relaxed transition-colors ${
                isSelected
                  ? "border-turquoise bg-light-turquoise text-navy"
                  : "border-black/5 bg-off-white text-navy/80 active:bg-light-turquoise/60"
              }`}
            >
              {localizedText(option)}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div key={selected} className="explorer-fade-in mt-4 flex flex-col gap-3 border-t border-black/5 pt-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("explorer.communicatesTitle")}
            </p>
            <button
              type="button"
              aria-label={t("common.readAloud")}
              onClick={() => speak(localizedText(selectedOption), speechLang)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-blue text-blue"
            >
              <Volume2 size={15} />
            </button>
          </div>
          <p className="-mt-2 text-sm leading-relaxed text-navy/80">
            {localizedField(selectedOption, "communicates")}
          </p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("explorer.childInterpretsTitle")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-navy/80">
              {localizedField(selectedOption, "childInterprets")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("explorer.cooperationTitle")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-navy/80">
              {localizedField(selectedOption, "cooperationNote")}
            </p>
          </div>

          {alternativeText && (
            <div className="rounded-2xl bg-light-turquoise p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {t("explorer.alternativeTitle")}
              </p>
              <p className="mt-1 font-serif text-base leading-snug text-navy">{alternativeText}</p>
              <button
                type="button"
                onClick={() => setSelected(selected === "A" ? "B" : "A")}
                className="mt-2 text-sm font-semibold text-turquoise"
              >
                {t("explorer.tryThis")}
              </button>
            </div>
          )}

          <p className="text-xs leading-relaxed text-muted">{t("explorer.reflectionNote")}</p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSelected(selected === "A" ? "B" : "A")}
              className="min-h-11 rounded-full bg-light-blue px-4 py-2.5 text-sm font-semibold text-blue"
            >
              {t("explorer.tryAnother")}
            </button>
            {onNextScenario && (
              <button
                type="button"
                onClick={onNextScenario}
                className="flex min-h-11 items-center gap-1.5 rounded-full bg-turquoise px-4 py-2.5 text-sm font-semibold text-white"
              >
                {t("explorer.nextScenario")}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
