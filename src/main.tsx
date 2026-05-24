import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';

import './index.css';

import { FavoritesProvider } from './context/FavoritesContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,

      retry: 2,

      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <FavoritesProvider>
        <App />
      </FavoritesProvider>

      <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  </React.StrictMode>
);