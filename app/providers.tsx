'use client';

import { SettingsProvider } from '@/app/_lib/global-context';
import { SessionProvider } from 'next-auth/react';

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