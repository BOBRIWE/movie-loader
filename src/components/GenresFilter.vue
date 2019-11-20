<template>
  <section class="genres-filter">
    <section class="genres-filter__selected-genres">
      <article
        class="genres-filter__selected-genre"
        v-for="genre in selectedGenres"
        :key="genre.name"
        @click="removeGenre(genre)"
      >
        {{genre.name}}
      </article>
    </section>
    <label for="genres-select">Genres</label><br/>
    <section
      tabindex="0"
      id="genres-select"
      class="genres-filter__select"
      @focusin="onGenresFocusIn"
      @focusout="onGenresFocusOut"
    >
      <article v-if="genresActive" class="genres-filter__container">
        <article
          class="genres-filter__genre"
          v-for="genre in genres"
          :key="genre.id"
          :value="genre.id"
          @click="onGenreSelected(genre)"
        >
          {{genre.name}}
        </article>
      </article>
    </section>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue, Watch,
} from 'vue-property-decorator';
import MovieDBApi from '@/MovieDBApi/MovieDBApi';
import IGenre from '@/MovieDBApi/IGenre';

@Component
export default class GenresFilter extends Vue {
  private genres: IGenre[] = [];

  private selectedGenres: IGenre[] = [];

  private genresActive: boolean = false;

  async created() {
    const genres = await MovieDBApi.getGenres();
    this.genres = genres.genres;
  }

  removeGenre(genreToRemove: IGenre) {
    const selected = this.selectedGenres;

    const i = selected.indexOf(genreToRemove);
    if (i > -1) {
      selected.splice(i, 1);
    }

    this.selectedGenres = selected;
  }

  onGenreSelected(selectedGenre: IGenre) {
    if (this.selectedGenres.indexOf(selectedGenre) === -1) {
      const newSelected = this.selectedGenres;
      newSelected.push(selectedGenre);
      this.selectedGenres = newSelected;
    }
  }

  @Watch('selectedGenres')
  onSelectedKeywordsChanged(val: IGenre[], oldVal: IGenre[]) {
    this.$emit('onSelectedGenresChanged', val);
  }

  onGenresFocusIn() {
    this.genresActive = true;
  }

  onGenresFocusOut() {
    this.genresActive = false;
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
    border: 1px solid $dark100;
    background-color: $white100;
    position: relative;
  }

  &__container {
    position: absolute;
    border: 1px solid $dark100;
    top: 40px;
    background-color: $white100;
  }

  &__genre {
    &:hover {
      background-color: $gray100;
      cursor: pointer;
    }
  }

  &__selected-genre {
    background-color: $gray100;
    border-radius: 5px;
    position: relative;
    width: fit-content;
    padding: 5px 25px 5px 5px;

    &:hover {
      cursor: pointer;
    }


    &:after {
      content: 'x';
      position: absolute;
      right: 10px;
      color: $white100;
    }
  }
}
</style>
