import type { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface AppShellProps {
  children: ReactNode;
  totalXP?: number;
  showHeader?: boolean;
  showNavigation?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function AppShell({
  children,
  totalXP = 0,
  showHeader = true,
  showNavigation = true,
  showBack = false,
  onBack,
  title,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && (
        <Header
          totalXP={totalXP}
          showBack={showBack}
          onBack={onBack}
          title={title}
        />
      )}

      <main
        className={`
          flex-1 overflow-y-auto
          ${showNavigation ? 'pb-24' : 'pb-6'}
          ${showHeader ? 'pt-4' : 'pt-6'}
          px-4
        `}
      >
        <div className="max-w-lg mx-auto">
          {children}
        </div>
      </main>

      {showNavigation && <Navigation />}
    </div>
  );
}
