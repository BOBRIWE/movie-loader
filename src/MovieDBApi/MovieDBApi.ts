import QueryString from 'query-string';
import Request from '@/Request';
import IPagedResponse from '@/MovieDBApi/IPagedResponse';
import IDiscoverQuery from '@/MovieDBApi/IDiscoverQuery';
import IGenresResponse from '@/MovieDBApi/IGenresResponse';

export default class MovieDBApi {
  static async getNowPlaying(): Promise<IPagedResponse> {
    const request = new Request('/movie/now_playing');
    return request.get<IPagedResponse>();
  }

  static async getPopular(): Promise<IPagedResponse> {
    const request = new Request('/movie/popular');
    return request.get<IPagedResponse>();
  }

  static async getTopRated(): Promise<IPagedResponse> {
    const request = new Request('/movie/top_rated');
    return request.get<IPagedResponse>();
  }

  static async getUpcoming(): Promise<IPagedResponse> {
    const request = new Request('/movie/upcoming');
    return request.get<IPagedResponse>();
  }

  static async discoverMovie(query: IDiscoverQuery): Promise<IPagedResponse> {
    const request = new Request(`/discover/movie/?${QueryString.stringify(query)}`);
    return request.get<IPagedResponse>();
  }

  static async getGenres(): Promise<IGenresResponse> {
    const request = new Request('/genre/movie/list');
    return request.get<IGenresResponse>();
  }
}
