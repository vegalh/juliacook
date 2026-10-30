import { Bookmark } from "lucide-react";
import { useLocale } from "../i18n/LocaleContext";

interface SaveButtonProps {
  saved: boolean;
  onClick: () => void;
}

export function SaveButton({ saved, onClick }: SaveButtonProps) {
  const { t } = useLocale();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? t("common.removeSavedItem") : t("common.saveItem")}
      aria-pressed={saved}
      className="flex h-10 w-10 items-center justify-center text-navy"
    >
      <Bookmark size={22} fill={saved ? "#E96532" : "none"} color={saved ? "#E96532" : "#172B4D"} />
    </button>
  );
}
