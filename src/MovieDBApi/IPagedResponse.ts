/* eslint camelcase: 0 */

interface IPagedResponse<TResult> {
  page: number
  results: TResult[]
  total_results: number
  total_pages: number
}

export default IPagedResponse;
