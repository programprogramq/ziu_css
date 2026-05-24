import { useState } from 'react';

import { useDebounce } from './hooks/useDebounce';
import { useFetchMovies } from './hooks/useFetchMovies';

import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { SearchBar } from './components/SearchBar';
import { SkeletonCard } from './components/SkeletonCard';
import { ErrorBanner } from './components/ErrorBanner';
import { EmptyState } from './components/EmptyState';

import { PageWrapper } from './components/PageWrapper';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  const debouncedQuery = useDebounce(query);

  const { data, isLoading, isError, error } = useFetchMovies(
    page,
    debouncedQuery
  );

  const movies = data?.results ?? [];

  return (
    <PageWrapper>
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
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onOpen={setSelectedMovie}
                />
              ))}
            </div>

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
    </PageWrapper>
  );
}

export default App;