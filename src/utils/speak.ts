/** Reads text aloud using the browser's speech synthesis, when available. */
export function speak(text: string, lang?: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (lang) utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}
