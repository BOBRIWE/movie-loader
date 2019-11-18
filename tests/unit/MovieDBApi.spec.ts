import nodeFetch from 'node-fetch';
import Request from '../../src/Request';
import MovieDBApiCredentials from '@/MovieDBApi/MovieDBApiCredentials';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';

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
});
