<template>
  <section class="movies-list">
    <header class="movies-list__header">
      <YearFilter @onYearSelected="onYearChanged"/>
      <GenresFilter @onGenresChanged="onGenresChanged"/>
      <KeywordFilter @onSelectedKeywordsChanged="onKeywordsChanged"/>
    </header>
    <main class="movies-list__main">
      <MoviesListCard
        v-for="movie in movies"
        v-bind:key="`card-${movie.id}`"
        v-bind:movie="movie"
      />
      <Error :error="error"/>
    </main>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import IMovie from '../MovieDBApi/IMovie';
import MoviesListCard from '@/components/MoviesListCard.vue';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';
import IPagedResponse from '@/MovieDBApi/IPagedResponse';
import YearFilter from '@/components/YearFilter.vue';
import IDiscoverQuery from '@/MovieDBApi/IDiscoverQuery';
import GenresFilter from '@/components/GenresFilter.vue';
import KeywordFilter from '@/components/KeywordFilter.vue';
import IKeyword from '@/MovieDBApi/IKeyword';
import Error from '@/components/Error.vue';
@Component({
  components: {
    Error,
    KeywordFilter,
    GenresFilter,
    YearFilter,
    MoviesListCard,
  },
})
export default class MoviesList extends Vue {
  private movies: IMovie[] = [];

  private queryObj: IDiscoverQuery = {};

  private error: Error | null = null;

  private pages: number = 1;

  created() {
    this.updateMoviesList(this.queryObj);
  }

  onYearChanged(newYear: string) {
    if (newYear === '') {
      this.queryObj.year = undefined;
    } else {
      this.queryObj.year = parseInt(newYear, 10);
    }

    this.updateMoviesList(this.queryObj);
  }

  onGenresChanged(genresIds: number[]) {
    this.queryObj.with_genres = genresIds.join('&');
    this.updateMoviesList(this.queryObj);
  }

  onKeywordsChanged(keywords: IKeyword[]) {
    this.queryObj.with_keywords = keywords.map(value => value.id).join('&');
    this.updateMoviesList(this.queryObj);
  }

  updateMoviesList(query: IDiscoverQuery) {
    const discoverMoviesRequest = MovieDBApi.discoverMovie(query);
    discoverMoviesRequest
      .then((data) => {
        this.error = null;
        this.movies = data.results;
        this.pages = data.total_pages;
      })
      .catch((e: Error) => {
        this.error = e;
        this.movies = [];
        console.log(e);
      });
  }
}
</script>

<style scoped lang="scss">
.movies-list {


  &__main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 231px;
    row-gap: 20px;
    column-gap: 20px;
  }

  &__header {
    padding: 10px;
    display: grid;
    grid-auto-flow: column;
  }
}
</style>
