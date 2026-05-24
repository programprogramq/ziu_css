import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import App from './App';
import { AppRouter } from './AppRouter';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);