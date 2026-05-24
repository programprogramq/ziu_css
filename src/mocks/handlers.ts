import {
  http,
  HttpResponse,
  delay,
} from 'msw';

export const handlers = [
  http.get(
    'https://api.themoviedb.org/3/movie/popular',
    async () => {
      await delay(1000);

      return HttpResponse.json({
        page: 1,

        results: [],
      });
    }
  ),
];