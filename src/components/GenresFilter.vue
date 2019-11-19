<template>
  <section class="genres-filter">
    <section class="genres-filter__selected-genres">
      <article
        class="genres-filter__selected-genre"
        v-for="name in selectedGenresNames"
        :key="name"
        @click="removeGenre(name)"
      >
        {{name}}
      </article>
    </section>
    <select class="genres-filter__select" @change="onGenresSelected">
      <option disabled selected></option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
    </select>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';
import IGenre from '@/MovieDBApi/IGenre';

@Component
export default class GenresFilter extends Vue {
  private genres: IGenre[] = [];

  private selectedGenresIds: number[] = [];

  private selectedGenresNames: string[] = [];

  async created() {
    const genres = await MovieDBApi.getGenres();
    this.genres = genres.genres;
  }

  removeGenre(name: string) {
    const names = this.selectedGenresNames;
    const ids = this.selectedGenresIds;

    const i = names.indexOf(name);
    if (i > -1) {
      names.splice(i, 1);
      ids.splice(i, 1);
    }

    this.selectedGenresIds = ids;
    this.selectedGenresNames = names;
    this.$emit('onGenresChanged', ids);
  }

  onGenresSelected(e: Event) {
    const { value } = e.target as HTMLInputElement;
    const id: number = parseInt(value, 10);
    const genre = this.genres.find(i => i.id === id) as IGenre;

    this.selectedGenresIds.push(id);
    this.selectedGenresNames.push(genre.name);
    this.$emit('onGenresChanged', this.selectedGenresIds);
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.genres-filter {
  width: fit-content;

  &__select {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background-color: $white100;
  }

  &__selected-genre {
    background-color: $gray100;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    width: fit-content;

    &:hover {
      cursor: pointer;
    }


    &:after {
      content: 'x';
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
