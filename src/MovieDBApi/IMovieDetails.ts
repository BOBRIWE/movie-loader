/* eslint camelcase: 0 */
import IGenre from '@/MovieDBApi/IGenre';
import IProductionCountries from '@/MovieDBApi/IProductionCountries';
import IProductionCompanies from '@/MovieDBApi/IProductionCompanies';
import ISpokenLanguages from '@/MovieDBApi/ISpokenLanguages';

interface IMovieDetails {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: null | object
  budget: number
  genres: IGenre[]
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  production_companies: IProductionCompanies[]
  production_countries: IProductionCountries[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: ISpokenLanguages[]
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export default IMovieDetails;
