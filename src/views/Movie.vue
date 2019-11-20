<template>
  <MovieDetails
    v-if="movieDetails !== null"
    :movieDetails="movieDetails"
    :movieVideos="movieVideos"
  />
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
@Component({
  components: { MovieDetails },
})
export default class Movie extends Vue {
  @Prop() private id!: string;

  private movieDetails: IMovieDetails | null = null;

  private movieVideos: IVideo[] = [];

  async created() {
    try {
      const movie = await MovieDBApi.getMovieDetails(this.id);
      const videos = await MovieDBApi.getMovieVideos(this.id);
      this.movieDetails = movie;
      this.movieVideos = videos.results;
    } catch (e) {
      this.movieDetails = null;
      this.movieVideos = [];
      console.error(e);
    }
  }
}
</script>

<style scoped>

</style>
