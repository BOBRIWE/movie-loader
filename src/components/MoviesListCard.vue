<template>
  <article class="movie-list-card">
    <section class="movie-list-card__image">
      <img :src="posterPath"/>
    </section>
    <section class="movie-list-card__description">
      <header class="movie-list-card__title">{{ shortenTitle }}</header>
      <p class="movie-list-card__overview">{{ shortenOverview }}</p>
      <footer class="movie-list-card__extra"></footer>
      <a class="movie-list-card__movie-details" :href="movieLink">See details...</a>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IMovie from '@/MovieDBApi/IMovie';
import MovieDBPostersRoot from '@/MovieDBApi/MovieDBPostersRoot';

@Component
export default class MoviesListCard extends Vue {
  @Prop() private movie!: IMovie;

  get posterPath(): string {
    return MovieDBPostersRoot.w154 + this.movie.poster_path;
  }

  get shortenOverview(): string {
    if (this.movie.overview.length >= 240) {
      return `${this.movie.overview.slice(0, 237)}...`;
    }

    return this.movie.overview;
  }

  get movieLink(): string {
    return `/Movie/${this.movie.id}`;
  }

  get shortenTitle(): string {
    if (this.movie.title.length >= 20) {
      return `${this.movie.title.slice(0, 17)}...`;
    }

    return this.movie.title;
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.movie-list-card {
  display: grid;
  grid-auto-flow: column;

  color: $dark100;
  font-size: 0.9em;
  line-height: 1.2em;

  height: fit-content;
  width: fit-content;

  &__description {
    display: grid;
    grid-auto-flow: row;
    padding: 10px;
    height: fit-content;
  }

  &__image {
    height: fit-content;
  }

  &__title {
    height: fit-content;
    font-size: 1.2em;
    font-weight: bold;
    line-height: 1.2em;
  }

  &__overview {
    text-align: left;
  }
}
</style>
