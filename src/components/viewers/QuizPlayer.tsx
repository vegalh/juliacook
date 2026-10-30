import { useState } from "react";
import { useLocale } from "../../i18n";

export interface QuizQuestion {
  id: string;
  question: string;
  questionZh: string;
  options: string[];
  optionsZh: string[];
  correctIndex: number;
  explanation?: string;
  explanationZh?: string;
}

/**
 * Reusable, fully interactive comprehension-quiz scaffold — unlike the
 * media viewers, a quiz is original UI/interaction logic rather than
 * licensed media, so there is no "unavailable" state here: it works as soon
 * as a caller supplies `questions`. No book currently ships a verified quiz
 * record, so nothing in the live app renders this yet (see
 * docs/frontend-content-components.md); it is exercised directly by tests.
 */
export function QuizPlayer({ questions }: { questions: QuizQuestion[] }) {
  const { locale, t } = useLocale();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  if (questions.length === 0) return null;
  const current = questions[index];
  const isLast = index === questions.length - 1;
  const question = locale === "zh" ? current.questionZh : current.question;
  const options = locale === "zh" ? current.optionsZh : current.options;
  const explanation = locale === "zh" ? current.explanationZh : current.explanation;

  const choose = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setIndex((i) => i + 1);
  };

  if (index >= questions.length) return null;

  return (
    <div className="rounded-2xl bg-off-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {t("viewer.quizProgress", { current: index + 1, total: questions.length })}
      </p>
      <p className="mt-1 font-serif text-base font-bold text-navy">{question}</p>

      <div className="mt-3 flex flex-col gap-2">
        {options.map((option, i) => {
          const isCorrect = i === current.correctIndex;
          const isChosen = i === selected;
          const showResult = selected !== null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={`min-h-11 rounded-2xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                showResult && isCorrect
                  ? "bg-turquoise text-white"
                  : showResult && isChosen
                    ? "bg-orange/10 text-orange"
                    : "bg-white text-navy"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-3">
          {explanation && <p className="text-xs leading-relaxed text-navy/70">{explanation}</p>}
          {isLast ? (
            <p className="mt-2 text-sm font-semibold text-navy">
              {t("viewer.quizScore", { score, total: questions.length })}
            </p>
          ) : (
            <button type="button" onClick={next} className="mt-2 text-sm font-semibold text-blue">
              {t("viewer.quizNext")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
