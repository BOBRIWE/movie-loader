<template>
  <section class="movie-details">
    <article class="movie-details__info">
      <article class="movie-details__image">
        <img :src="posterPath">
      </article>
      <article class="movie-details__description">
        <header class="movie-details__header">
          <span class="movie-details__title">{{movieDetails.title}}</span>
          <span class="movie-details__release-date">{{movieDetails.release_date}}</span>
        </header>
        <main class="movie-details__main">
          <p class="movie-details__overview">{{movieDetails.overview}}</p>
        </main>
        <footer class="movie-details__footer">
          <span class="movie-details__budget">{{budget}}</span>
        </footer>
      </article>
    </article>
    <span class="movie-details__trailers__title">Trailers</span>
    <article class="movie-details__trailers">
      <YoutubeVideo v-for="video in filteredVideos" :videoKey="video.key" :key="video.key"/>
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
import IVideo from '@/MovieDBApi/IVideo';
import YoutubeVideo from '@/components/YoutubeVideo.vue';
import MovieDBPostersRoot from '@/MovieDBApi/MovieDBPostersRoot';
@Component({
  components: { YoutubeVideo },
})
export default class Movie extends Vue {
  @Prop() private movieDetails!: IMovieDetails;

  @Prop() private movieVideos!: IVideo[];

  get posterPath(): string {
    return MovieDBPostersRoot.w500 + this.movieDetails.poster_path;
  }

  get filteredVideos(): IVideo[] {
    return this.movieVideos.filter(video => video.site === 'YouTube');
  }

  get budget(): string {
    return `Budget: ${this.movieDetails.budget}$`;
  }
}
</script>

<style scoped lang="scss">
.movie-details {
  display: grid;
  grid-auto-flow: row;

  &__info {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
  }

  &__description {
    padding: 20px;
  }

  &__budget {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }

  &__overview {
    text-align: left;
    font-size: 18px;
    line-height: 25px;
  }

  &__header {
    display: grid;
    grid-auto-flow: row;
    width: fit-content;
    text-align: left;
  }

  &__footer {
    width: fit-content;
  }

  &__title {
    font-weight: bold;
    font-size: 30px;
    text-align: left;
    justify-self: left;
    width: fit-content;
  }

  &__release-date {
    font-size: 15px;
  }

  &__trailers {
    display: grid;
    row-gap: 10px;
    column-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));

    &__title {
      padding: 20px;
      font-size: 30px;
      justify-self: left;
      font-weight: bold;
    }
  }
}
</style>
