<template>
  <section class="movie-search">
    <input
      class="movie-search__input"
      type="text"
      placeholder="Search movie..."
      @input="onInput"
      @focusout="onFocusOut"
      @focusin="onFocusIn"
    >
    <article v-if="isFocused" class="movie-search__results">
      <a
        v-for="movie in searchResults"
        :key="movie.id"
        class="movie-search__result"
        :href="`/Movie/${movie.id}`"
      >
        {{movie.title}}
      </a>
    </article>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import IMovie from '../MovieDBApi/IMovie';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';

@Component
export default class MovieSearch extends Vue {
  private searchResults: IMovie[] = [];

  private isFocused: boolean = false;

  onInput(e: Event) {
    const { value } = e.target as HTMLInputElement;

    const movieSearch = MovieDBApi.getMovieByName(value);
    movieSearch
      .then((data) => {
        this.searchResults = data.results;
      });
  }

  onFocusIn() {
    this.isFocused = true;
  }

  onFocusOut() {
    setTimeout(() => {
      this.isFocused = false;
    }, 100);
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.movie-search {
  position: relative;
  width: fit-content;

  &__input {

  }

  &__results {
    position: absolute;
    top: 20px;
    border: 1px solid black;
    background: $white100;
    display: grid;
    grid-auto-flow: row;
    text-align: left;
  }

  &__result {
    text-decoration: none;
    color: $dark100;

    &:hover {
      background-color: $gray100;
    }
  }
}
</style>
