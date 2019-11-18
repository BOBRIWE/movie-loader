/* eslint camelcase: 0 */
import IMovie from '@/MovieDBApi/IMovie';

interface IPagedResponse {
  page: number
  results: IMovie[]
  total_results: number
  total_pages: number
}

export default IPagedResponse;
