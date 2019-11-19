<template>
  <MovieDetails v-if="movieDetails !== null" :movieDetails="movieDetails"/>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import IMovieDetails from '@/MovieDBApi/IMovieDetails';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';
import MovieDetails from '@/components/MovieDetails.vue';
@Component({
  components: { MovieDetails },
})
export default class Movie extends Vue {
  @Prop() private id!: string;

  private movieDetails: IMovieDetails | null = null;

  async created() {
    try {
      const movie = await MovieDBApi.getMovieDetails(this.id);
      this.movieDetails = movie;
    } catch (e) {
      this.movieDetails = null;
      console.error(e);
    }
  }
}
</script>

<style scoped>

</style>
