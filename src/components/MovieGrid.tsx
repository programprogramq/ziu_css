import { Reorder, motion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import type { Movie } from '../types/movie';

interface Props {
  movies: Movie[];
  onOpen: (id: number) => void;
  onReorder: (movies: Movie[]) => void;
}

export function MovieGrid({ movies, onOpen, onReorder }: Props) {
  return (
    <Reorder.Group
      axis="y"
      values={movies}
      onReorder={onReorder}
      as="div"
      className="movie-grid"
    >
      {movies.map((movie) => (
        <Reorder.Item
          key={movie.id}
          value={movie}
          as="div"
          whileDrag={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
          layout
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: movies.indexOf(movie) * 0.08,
                },
              },
            }}
          >
            <MovieCard movie={movie} onOpen={onOpen} />
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}