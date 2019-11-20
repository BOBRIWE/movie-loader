<template>
  <section class="movie-search">
    <input class="movie-search__input" type="text" placeholder="Search movie..." @input="onInput">
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import IMovie from '../MovieDBApi/IMovie';

@Component
export default class MovieSearch extends Vue{
  private searchResults: IMovie[] = [];

  onInput(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.$emit('onYearSelected', value);
  }
}
</script>

<style scoped>

</style>
