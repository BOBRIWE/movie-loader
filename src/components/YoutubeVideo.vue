<template>
  <iframe
    class="youtube-video"
    :src="youtubeVideoLink"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import IMovieDetails from '@/MovieDBApi/IMovieDetails';
import IVideo from '@/MovieDBApi/IVideo';

@Component
export default class YoutubeVideo extends Vue {
  @Prop() private videoKey!: string;

  get youtubeVideoLink(): string {
    return `https://www.youtube.com/embed/${this.videoKey}`;
  }
}
</script>

<style scoped lang="scss">
.youtube-video {
  width: 100%;
  height: 400px;
}
</style>
