/* eslint camelcase: 0 */

interface ISearchMovieQuery {
  language?: string
  query: string
  page?: number
  include_adult?: boolean
  region?: string
  year?: number
  primary_release_year?: number

}

export default ISearchMovieQuery;
