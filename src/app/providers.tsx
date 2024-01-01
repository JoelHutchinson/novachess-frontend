'use client';

import { SettingsProvider } from '@/app/_lib/globalContext';

export default function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <SettingsProvider>
      {children}
    </SettingsProvider>
  );
}