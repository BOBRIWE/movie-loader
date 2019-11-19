import QueryString from 'query-string';
import Request from '@/Request';
import IPagedResponse from '@/MovieDBApi/IPagedResponse';
import IDiscoverQuery from '@/MovieDBApi/IDiscoverQuery';
import IGenresResponse from '@/MovieDBApi/IGenresResponse';
import IMovie from '@/MovieDBApi/IMovie';
import IKeyword from '@/MovieDBApi/IKeyword';
import ISearchKeywordQuery from '@/MovieDBApi/ISearchKeywordQuery';

export default class MovieDBApi {
  static async getNowPlaying(): Promise<IPagedResponse<IMovie>> {
    const request = new Request('/movie/now_playing');
    return request.get<IPagedResponse<IMovie>>();
  }

  static async getPopular(): Promise<IPagedResponse<IMovie>> {
    const request = new Request('/movie/popular');
    return request.get<IPagedResponse<IMovie>>();
  }

  static async getTopRated(): Promise<IPagedResponse<IMovie>> {
    const request = new Request('/movie/top_rated');
    return request.get<IPagedResponse<IMovie>>();
  }

  static async getUpcoming(): Promise<IPagedResponse<IMovie>> {
    const request = new Request('/movie/upcoming');
    return request.get<IPagedResponse<IMovie>>();
  }

  static async discoverMovie(query: IDiscoverQuery): Promise<IPagedResponse<IMovie>> {
    const request = new Request(`/discover/movie/?${QueryString.stringify(query)}`);
    return request.get<IPagedResponse<IMovie>>();
  }

  static async getGenres(): Promise<IGenresResponse> {
    const request = new Request('/genre/movie/list');
    return request.get<IGenresResponse>();
  }

  static async getKeywordsByName(name: string): Promise<IPagedResponse<IKeyword>> {
    const query: ISearchKeywordQuery = { query: name };
    const request = new Request(`/search/keyword?${QueryString.stringify(query)}`);
    return request.get<IPagedResponse<IKeyword>>();
  }
}
