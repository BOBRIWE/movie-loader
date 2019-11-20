<template>
  <section class="pagination">
    <label for="pagination">Page Selection</label><br/>
    <input
      id="pagination"
      class="pagination__input"
      type="number"
      min="1"
      :max="pages"
      value="1"
      @input="onPaginationInput">
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() private pages!: number;

  onPaginationInput(e: Event) {
    const { value } = e.target as HTMLInputElement;
    const nValue = parseInt(value, 10);
    if (nValue > this.pages || nValue < 1) {
      console.log('hit');
      return;
    }
    this.$emit('onPaginationInput', nValue);
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.pagination {
  &__input {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background-color: $white100;
    border: 1px solid $gray100;
  }
}
</style>
