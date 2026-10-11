import type { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function AppLayout({ children, showNav = false }: AppLayoutProps) {
  return (
    <div className="relative flex h-dvh w-full max-w-[430px] flex-col bg-white shadow-xl">
      <div className="no-scrollbar flex-1 overflow-y-auto">{children}</div>
      {showNav && <BottomNavigation />}
    </div>
  );
}
