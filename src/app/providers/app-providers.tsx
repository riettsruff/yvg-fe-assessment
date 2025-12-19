import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { Toaster as Sonner } from '@/components/core/sonner';
import { Toaster } from '@/components/core/toaster';
import { TooltipProvider } from '@/components/core/tooltip';
import { LocaleProvider } from '@/contexts/locale-context';

import { queryClient } from './query-client';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </Provider>
);

export default AppProviders;
