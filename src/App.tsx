import { useState } from 'react';

import { useDebounce } from './hooks/useDebounce';
import { useFetchMovies } from './hooks/useFetchMovies';

import { MovieModal } from './components/MovieModal';
import { SearchBar } from './components/SearchBar';
import { SkeletonCard } from './components/SkeletonCard';
import { ErrorBanner } from './components/ErrorBanner';
import { EmptyState } from './components/EmptyState';

import { MovieGrid } from './components/MovieGrid';
import type { Movie } from './types/movie';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  const [orderedMovies, setOrderedMovies] = useState<Movie[]>([]);

  const debouncedQuery = useDebounce(query);

  const { data, isLoading, isError, error } = useFetchMovies(
    page,
    debouncedQuery
  );

  const movies = data?.results ?? [];

  return (
    <main className="container">
      <h1>Movie Browser</h1>

      <SearchBar value={query} onChange={setQuery} />

      {isLoading && (
        <div className="movie-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && (
        <ErrorBanner message={(error as Error).message} />
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <EmptyState />
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieGrid
            movies={orderedMovies.length ? orderedMovies : movies}
            onOpen={setSelectedMovie}
            onReorder={setOrderedMovies}
          />

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Poprzednia
            </button>

            <span>Strona {page}</span>

            <button onClick={() => setPage((p) => p + 1)}>
              Następna
            </button>
          </div>
        </>
      )}

      <MovieModal
        movieId={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}

export default App;