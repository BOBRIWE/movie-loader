<template>
  <section class="movies-list">
    <header class="movies-list__header">
      <YearFilter @onYearSelected="onYearChanged"/>
      <GenresFilter @onGenresChanged="onGenresChanged"/>
    </header>
    <main class="movies-list__main">
      <MoviesListCard
        v-for="movie in movies"
        v-bind:key="`card-${movie.id}`"
        v-bind:movie="movie"
      />
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
@Component({
  components: { GenresFilter, YearFilter, MoviesListCard },
})
export default class MoviesList extends Vue {
  private movies: IMovie[] = [];

  private queryObj: IDiscoverQuery = {};

  created() {
    this.updateMoviesList(this.queryObj);
  }

  onYearChanged(newYear: string) {
    this.queryObj.year = parseInt(newYear, 10);
    this.updateMoviesList(this.queryObj);
  }

  onGenresChanged(genresIds: number[]) {
    this.queryObj.with_genres = genresIds.join('&');
    this.updateMoviesList(this.queryObj);
  }

  updateMoviesList(query: IDiscoverQuery) {
    const discoverMoviesRequest = MovieDBApi.discoverMovie(query);
    discoverMoviesRequest
      .then((data) => {
        this.movies = data.results;
      })
      .catch((e: Error) => {
        this.movies = [];
        console.warn(e.message);
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
