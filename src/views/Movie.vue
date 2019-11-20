<template>
  <main class="movie">
    <MovieDetails
      v-if="movieDetails !== null"
      :movieDetails="movieDetails"
      :movieVideos="movieVideos"
    />
    <Error :error="error"/>
  </main>
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
import IVideo from '@/MovieDBApi/IVideo';
import Error from '@/components/Error.vue';
@Component({
  components: { Error, MovieDetails },
})
export default class Movie extends Vue {
  @Prop() private id!: string;

  private movieDetails: IMovieDetails | null = null;

  private movieVideos: IVideo[] = [];

  private error: Error | null = null;

  async created() {
    try {
      this.error = null;
      const movie = await MovieDBApi.getMovieDetails(this.id);
      const videos = await MovieDBApi.getMovieVideos(this.id);
      this.movieDetails = movie;
      this.movieVideos = videos.results;
    } catch (e) {
      this.movieDetails = null;
      this.movieVideos = [];
      this.error = e;
    }
  }
}
</script>

<style scoped>

</style>
