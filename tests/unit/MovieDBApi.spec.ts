import nodeFetch from 'node-fetch';
import Request from '../../src/Request';
import MovieDBApiCredentials from '@/MovieDBApi/MovieDBApiCredentials';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';
import IResponseError from '@/MovieDBApi/IResponseError';
import MovieDBStatusCodesEnum from '@/MovieDBApi/MovieDBStatusCodesEnum';
import ErrorResponse from '@/MovieDBApi/ErrorResponse';

describe('MovieDBApi', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = nodeFetch;
  });
  it('should fetch data', async () => {
    const request = new Request('/movie/299536-avengers-infinity-war');
    const response = await request.get();

    expect(response).not.toBe(undefined);
  });

  it('should discover action movies', async () => {
    const pages = await MovieDBApi.discoverMovie({
      with_genres: '28',
    });

    expect(pages).not.toBe(undefined);

    pages.results.forEach((item) => {
      expect(item.genre_ids).toContain(28);
    });
  });

  it('should throw error on not found movie', async () => {
    expect.assertions(1);
    try {
      const movie = await MovieDBApi.getMovieDetails('10');
    } catch (e) {
      expect(<ErrorResponse>e.status_code).toBe(MovieDBStatusCodesEnum.ResourceNotFound);
    }
  });
});
