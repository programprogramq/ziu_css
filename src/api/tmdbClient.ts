import axios from 'axios';

export const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,

  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'pl-PL',
  },
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      new Error(
        error.response?.data?.status_message ??
          'Błąd pobierania danych'
      )
    );
  }
);