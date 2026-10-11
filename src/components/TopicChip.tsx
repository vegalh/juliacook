interface TopicChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TopicChip({ label, selected = false, onClick, className = "" }: TopicChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
        selected ? "bg-orange text-white" : "bg-light-turquoise text-navy"
      } ${className}`}
    >
      {label}
    </button>
  );
}
