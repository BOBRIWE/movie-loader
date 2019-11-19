<template>
  <section class="movie-details">
    <article class="movie-details__image"></article>
    <article class="movie-details__info">

    </article>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import IMovieDetails from '@/MovieDBApi/IMovieDetails';

@Component
export default class Movie extends Vue {
  @Prop() private movieDetails!: IMovieDetails;
}
</script>

<style scoped>

</style>
