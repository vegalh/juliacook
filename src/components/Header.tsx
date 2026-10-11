import type { ReactNode } from "react";

interface HeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-2">
      <div className="flex w-10 items-center">{left}</div>
      <div className="flex flex-1 items-center justify-center">{center}</div>
      <div className="flex w-10 items-center justify-end">{right}</div>
    </div>
  );
}
