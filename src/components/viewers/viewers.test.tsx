import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocaleProvider } from "../../i18n";
import { AudioPlayerViewer } from "./AudioPlayerViewer";
import { PdfViewer } from "./PdfViewer";
import { PosterViewer } from "./PosterViewer";
import { QuizPlayer, type QuizQuestion } from "./QuizPlayer";
import { ViewerUnavailable } from "./ViewerUnavailable";
import { VideoPlayerViewer } from "./VideoPlayerViewer";
import { Headphones } from "lucide-react";

function withLocale(ui: React.ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>);
}

describe("ViewerUnavailable", () => {
  it("renders the icon, title and unavailable note", () => {
    withLocale(<ViewerUnavailable icon={Headphones} title="A Sample Title" />);
    expect(screen.getByText("A Sample Title")).toBeInTheDocument();
    expect(
      screen.getByText("该资源暂时无法在应用内预览，详情见下方说明。")
    ).toBeInTheDocument();
  });
});

describe("AudioPlayerViewer", () => {
  it("shows the unavailable state when no src is given", () => {
    withLocale(<AudioPlayerViewer title="Audio Title" />);
    expect(screen.getByText("Audio Title")).toBeInTheDocument();
    expect(
      screen.getByText("该资源暂时无法在应用内预览，详情见下方说明。")
    ).toBeInTheDocument();
  });

  it("renders a native audio element when a src is given", () => {
    const { container } = withLocale(<AudioPlayerViewer title="Audio Title" src="https://example.com/a.mp3" />);
    const audio = container.querySelector("audio");
    expect(audio).toBeInTheDocument();
    expect(container.querySelector("source")).toHaveAttribute("src", "https://example.com/a.mp3");
  });
});

describe("VideoPlayerViewer", () => {
  it("shows the unavailable state when no src is given", () => {
    withLocale(<VideoPlayerViewer title="Video Title" />);
    expect(screen.getByText("Video Title")).toBeInTheDocument();
    expect(
      screen.getByText("该资源暂时无法在应用内预览，详情见下方说明。")
    ).toBeInTheDocument();
  });

  it("renders a native video element when a src is given", () => {
    const { container } = withLocale(<VideoPlayerViewer title="Video Title" src="https://example.com/v.mp4" />);
    expect(container.querySelector("video")).toBeInTheDocument();
    expect(container.querySelector("source")).toHaveAttribute("src", "https://example.com/v.mp4");
  });
});

describe("PdfViewer", () => {
  it("shows the unavailable state when no src is given", () => {
    withLocale(<PdfViewer title="Pdf Title" />);
    expect(screen.getByText("Pdf Title")).toBeInTheDocument();
    expect(
      screen.getByText("该资源暂时无法在应用内预览，详情见下方说明。")
    ).toBeInTheDocument();
  });

  it("renders an iframe and open-in-new-tab link when a src is given", () => {
    withLocale(<PdfViewer title="Pdf Title" src="https://example.com/doc.pdf" />);
    expect(screen.getByTitle("Pdf Title")).toBeInTheDocument();
    const link = screen.getByText("在新标签页中打开");
    expect(link.closest("a")).toHaveAttribute("href", "https://example.com/doc.pdf");
  });
});

describe("PosterViewer", () => {
  it("shows the unavailable state when no src is given", () => {
    withLocale(<PosterViewer title="Poster Title" />);
    expect(screen.getByText("Poster Title")).toBeInTheDocument();
    expect(
      screen.getByText("该资源暂时无法在应用内预览，详情见下方说明。")
    ).toBeInTheDocument();
  });

  it("renders an image when a src is given", () => {
    withLocale(<PosterViewer title="Poster Title" src="https://example.com/p.png" />);
    expect(screen.getByAltText("Poster Title")).toHaveAttribute("src", "https://example.com/p.png");
  });
});

const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What color is the sky?",
    questionZh: "天空是什么颜色？",
    options: ["Blue", "Green"],
    optionsZh: ["蓝色", "绿色"],
    correctIndex: 0,
    explanation: "The sky is blue.",
    explanationZh: "天空是蓝色的。",
  },
  {
    id: "q2",
    question: "What color is grass?",
    questionZh: "草是什么颜色？",
    options: ["Blue", "Green"],
    optionsZh: ["蓝色", "绿色"],
    correctIndex: 1,
    explanation: "Grass is green.",
    explanationZh: "草是绿色的。",
  },
];

describe("QuizPlayer", () => {
  it("renders nothing when there are no questions", () => {
    const { container } = withLocale(<QuizPlayer questions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("walks through a correct-then-incorrect answer flow and shows the final score", () => {
    withLocale(<QuizPlayer questions={quizQuestions} />);

    expect(screen.getByText("天空是什么颜色？")).toBeInTheDocument();
    expect(screen.getByText("第 1 / 2 题")).toBeInTheDocument();

    fireEvent.click(screen.getByText("蓝色"));
    expect(screen.getByText("天空是蓝色的。")).toBeInTheDocument();

    fireEvent.click(screen.getByText("下一题"));
    expect(screen.getByText("草是什么颜色？")).toBeInTheDocument();
    expect(screen.getByText("第 2 / 2 题")).toBeInTheDocument();

    fireEvent.click(screen.getByText("蓝色"));
    expect(screen.getByText("草是绿色的。")).toBeInTheDocument();
    expect(screen.getByText("得分：1 / 2")).toBeInTheDocument();
  });

  it("does not change the selection once an answer has been chosen", () => {
    withLocale(<QuizPlayer questions={quizQuestions} />);
    fireEvent.click(screen.getByText("蓝色"));
    fireEvent.click(screen.getByText("绿色"));
    expect(screen.getByText("天空是蓝色的。")).toBeInTheDocument();
  });
});
