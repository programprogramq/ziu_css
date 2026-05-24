import Modal from 'react-modal';

import { useMovieDetails } from '../hooks/useMovieDetails';

interface Props {
  movieId: number | null;
  onClose: () => void;
}

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function MovieModal({ movieId, onClose }: Props) {
  const { data, isLoading } = useMovieDetails(movieId);

  return (
    <Modal
      isOpen={movieId !== null}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      {isLoading && <p>Ładowanie...</p>}

      {data && (
        <>
          <img
            src={
              data.poster_path
                ? `${IMG_BASE}${data.poster_path}`
                : '/no-poster.png'
            }
            alt={data.title}
          />

          <h2>{data.title}</h2>

          <p>{data.overview}</p>

          <button onClick={onClose}>Zamknij</button>
        </>
      )}
    </Modal>
  );
}