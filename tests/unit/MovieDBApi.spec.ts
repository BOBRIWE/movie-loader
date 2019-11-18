import nodeFetch from 'node-fetch';
import Request from '../../src/Request';

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
});
