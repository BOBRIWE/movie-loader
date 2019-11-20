<template>
  <section class="keyword-filter">
    <section class="keyword-filter__selected-keywords">
      <article
        class="keyword-filter__selected-keyword"
        v-for="keyword in selectedKeywords"
        :key="keyword.id"
        @click="removeKeyword(keyword)"
      >
        {{keyword.name}}
      </article>
    </section>
    <section class="keyword-filter__main">
      <label for="keyword-input">Keywords</label><br/>
      <input
        class="keyword-filter__input"
        id="keyword-input" type="text"
        @input="onInputUpdate"
        @focusin="inputFocusIn"
        @focusout="inputFocusOut"
      >
      <article v-if="inputFocused" class="keyword-filter__possible-keywords">
        <div
          class="keyword-filter__keyword"
          v-for="keyword in keywords"
          :key="keyword.id"
          @click="keywordChosen(keyword)"
        >
          {{keyword.name}}
        </div>
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
import IKeyword from '@/MovieDBApi/IKeyword';

@Component
export default class KeywordFilter extends Vue {
  private keywords: IKeyword[] = [];

  private selectedKeywords: IKeyword[] = [];

  private inputFocused: boolean = false;

  onKeywordSelected(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.$emit('onYearSelected', value);
  }

  keywordChosen(keyword: IKeyword) {
    const keywords = this.selectedKeywords;
    if (keywords.indexOf(keyword) !== -1) {
      return;
    }

    keywords.push(keyword);
    this.selectedKeywords = keywords;
  }

  removeKeyword(keyword: IKeyword) {
    const keywords = this.selectedKeywords;

    const i = keywords.indexOf(keyword);
    if (i > -1) {
      keywords.splice(i, 1);
    }

    this.selectedKeywords = keywords;
  }

  onInputUpdate(e: Event) {
    const { value } = e.target as HTMLInputElement;
    if (value === '') {
      this.keywords = [];
      return;
    }
    const keywordsRequest = MovieDBApi.getKeywordsByName(value);

    keywordsRequest
      .then((data) => {
        this.keywords = data.results;
      })
      .catch(() => {
        this.keywords = [];
      });
  }

  inputFocusIn() {
    this.inputFocused = true;
  }

  inputFocusOut() {
    setTimeout(() => {
      this.inputFocused = false;
    }, 100);
  }

  @Watch('selectedKeywords')
  onSelectedKeywordsChanged(val: IKeyword[], oldVal: IKeyword[]) {
    this.$emit('onSelectedKeywordsChanged', val);
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.keyword-filter {

  &__selected-keyword {
    background-color: $gray100;
    border-radius: 5px;
    position: relative;
    width: fit-content;
    padding: 5px 20px 5px 5px;

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

  &__input {
    width: 100px;
    height: 40px;
    border: 1px solid $gray100;
    border-radius: 5px;
    background-color: $white100;
  }

  &__main {
    position: relative;
    width: fit-content;
  }

  &__keyword {
    &:hover {
      background-color: $gray100;
      cursor: pointer;
    }
  }

  &__possible-keywords {
    position: absolute;
    top: 60px;
    background-color: $white100;
    border: 1px solid black;
    &:empty {
      display: none;
    }
  }
}
</style>
