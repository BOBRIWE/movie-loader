<template>
  <section class="year-filter">
    <select class="year-filter__select" @change="onYearSelected">
      <option v-for="year in years" :key="year" :value="year">{{year}}</option>
    </select>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class YearFilter extends Vue {
  private years: number[] = [];

  // eslint-disable-next-line class-methods-use-this
  data() {
    const date = Date.now();
    const curYear = new Date(date).getFullYear();

    const years = [];

    let i = curYear;
    while (i > curYear - 10) {
      years.push(i);
      i -= 1;
    }

    this.$emit('onYearSelected', curYear);

    return {
      years,
    };
  }

  onYearSelected(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.$emit('onYearSelected', value);
  }
}
</script>

<style scoped lang="scss">
  @import "../scss/variables";

  .year-filter {

    &__select {
      width: 100px;
      height: 40px;
      border-radius: 5px;
      background-color: $gray100;
    }
  }
</style>
