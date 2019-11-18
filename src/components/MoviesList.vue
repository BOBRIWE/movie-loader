<template>
  <section class="movies-list">
    <MoviesListCard v-for="movie in movies" v-bind:key="`card-${movie.id}`" v-bind:movie="movie" />
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
@Component({
  components: { MoviesListCard },
})
export default class MoviesList extends Vue {
  private movies: IMovie[] = [];

  async created() {
    await this.updateMoviesList();
  }

  async updateMoviesList() {
    try {
      const discoverMoviesRequest = await MovieDBApi.discoverMovie({
        with_genres: '28',
      });
      this.movies = discoverMoviesRequest.results;
    } catch (e) {
      this.movies = [];
    }
  }
}
</script>

<style scoped lang="scss">
.movies-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 231px;
  row-gap: 20px;
  column-gap: 20px;
}
</style>
