import { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { ZodError } from 'zod';

import App from './App';
import ErrorBoundary from './layout/ErrorBoundary';

import './index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      throwOnError: (err) => err instanceof ZodError,
    },
    mutations: {
      throwOnError: (err) => err instanceof ZodError,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary message="에러가 발생했습니다.">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>,
);
