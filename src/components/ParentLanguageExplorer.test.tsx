import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "../i18n";
import { standaloneLanguageScenarios } from "../data/languageScenarios";
import { ParentLanguageExplorer } from "./ParentLanguageExplorer";

function wrapper({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}

const scenario = standaloneLanguageScenarios.find((s) => s.id === "spilled-water")!;

describe("ParentLanguageExplorer", () => {
  beforeEach(() => {
    // These tests assert Chinese copy; the app itself now defaults to
    // English, so pin the locale explicitly rather than relying on the default.
    localStorage.setItem("cookie-bytes:locale", "zh");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("shows the situation and prompt, with no feedback until a choice is made", () => {
    render(<ParentLanguageExplorer scenario={scenario} />, { wrapper });
    expect(screen.getByText(scenario.situationLineZh)).toBeInTheDocument();
    expect(screen.getByText(scenario.optionA.textZh)).toBeInTheDocument();
    expect(screen.getByText(scenario.optionB.textZh)).toBeInTheDocument();
    expect(screen.queryByText(scenario.optionA.communicatesZh)).not.toBeInTheDocument();
  });

  it("reveals feedback for the selected option", () => {
    render(<ParentLanguageExplorer scenario={scenario} />, { wrapper });
    fireEvent.click(screen.getByText(scenario.optionA.textZh));
    expect(screen.getByText(scenario.optionA.communicatesZh)).toBeInTheDocument();
    expect(screen.getByText(scenario.optionA.childInterpretsZh)).toBeInTheDocument();
    expect(screen.queryByText(scenario.optionB.communicatesZh)).not.toBeInTheDocument();
  });

  it("lets a parent switch to see the other option's feedback", () => {
    render(<ParentLanguageExplorer scenario={scenario} />, { wrapper });
    fireEvent.click(screen.getByText(scenario.optionA.textZh));
    expect(screen.getByText(scenario.optionA.communicatesZh)).toBeInTheDocument();

    fireEvent.click(screen.getByText("换一个回应看看"));
    expect(screen.getByText(scenario.optionB.communicatesZh)).toBeInTheDocument();
    expect(screen.queryByText(scenario.optionA.communicatesZh)).not.toBeInTheDocument();
  });

  it("resets its selection when the scenario changes", () => {
    const other = standaloneLanguageScenarios.find((s) => s.id !== scenario.id)!;
    const { rerender } = render(<ParentLanguageExplorer scenario={scenario} />, { wrapper });
    fireEvent.click(screen.getByText(scenario.optionA.textZh));
    expect(screen.getByText(scenario.optionA.communicatesZh)).toBeInTheDocument();

    rerender(
      <LocaleProvider>
        <ParentLanguageExplorer scenario={other} />
      </LocaleProvider>
    );
    expect(screen.queryByText(scenario.optionA.communicatesZh)).not.toBeInTheDocument();
  });

  it("calls onNextScenario when the next-scenario action is used", () => {
    const onNext = vi.fn();
    render(<ParentLanguageExplorer scenario={scenario} onNextScenario={onNext} />, { wrapper });
    fireEvent.click(screen.getByText(scenario.optionA.textZh));
    fireEvent.click(screen.getByText("下一个情境"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("renders English copy when the locale is switched to English", () => {
    localStorage.setItem("cookie-bytes:locale", "en");
    render(<ParentLanguageExplorer scenario={scenario} />, { wrapper });
    expect(screen.getByText(scenario.situationLine)).toBeInTheDocument();
    expect(screen.getByText(scenario.optionA.text)).toBeInTheDocument();
    fireEvent.click(screen.getByText(scenario.optionA.text));
    expect(screen.getByText(scenario.optionA.communicates)).toBeInTheDocument();
    localStorage.clear();
  });
});
