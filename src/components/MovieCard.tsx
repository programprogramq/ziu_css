import { useState } from 'react';

import { useFavorites } from '../context/FavoritesContext';
import type { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onOpen: (id: number) => void;
}

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function MovieCard({ movie, onOpen }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const [optimistic, setOptimistic] = useState<boolean | null>(null);

  const displayedFavorite =
    optimistic ?? isFavorite(movie.id);

  const handleFavorite = () => {
    setOptimistic(!displayedFavorite);
    toggleFavorite(movie);

    setTimeout(() => {
      setOptimistic(null);
    }, 200);
  };

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `${IMG_BASE}${movie.poster_path}`
            : '/no-poster.png'
        }
        alt={movie.title}
        onClick={() => onOpen(movie.id)}
      />

      <h3>{movie.title}</h3>

      <p>
        {movie.release_date?.slice(0, 4)} ⭐{' '}
        {movie.vote_average.toFixed(1)}
      </p>

      <button onClick={handleFavorite}>
        {displayedFavorite ? '' : ''}
      </button>
    </div>
  );
}