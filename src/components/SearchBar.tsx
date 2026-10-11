import { Mic, Search, SlidersHorizontal } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  mode?: "mic" | "filter";
  onSubmit?: (value: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({
  placeholder = "What's happening with your child?",
  defaultValue = "",
  mode = "mic",
  onSubmit,
  onFilterClick,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit?.(value);
  };

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-[0_4px_18px_rgba(23,43,77,0.08)]">
      <Search size={20} className="shrink-0 text-muted" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-navy placeholder:text-muted focus:outline-none"
      />
      {mode === "mic" ? (
        <button
          type="button"
          aria-label="Voice search"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-muted"
        >
          <Mic size={20} />
        </button>
      ) : (
        <>
          <span className="h-6 w-px shrink-0 bg-black/10" />
          <button
            type="button"
            aria-label="Open filters"
            onClick={onFilterClick}
            className="flex h-8 w-8 shrink-0 items-center justify-center text-orange"
          >
            <SlidersHorizontal size={20} />
          </button>
        </>
      )}
    </div>
  );
}
