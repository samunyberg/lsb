'use client';

import LanguageProvider from '@/providers/language/LanguageProvider';
import QueryProvider from '@/providers/QueryProvider';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
