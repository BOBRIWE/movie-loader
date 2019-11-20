<template>
  <section class="pagination">
    <label for="pagination">Page Selection</label>
    <input id="pagination" class="pagination" type="number" @input="onPaginationInput">
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
  @Prop() private pages!: string;

  onPaginationInput(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.$emit('onPaginationInput', value);
  }
}
</script>

<style scoped>

</style>
