<template>
  <header class="header">
    <MovieSearch/>
  </header>
</template>

<script>
import MovieSearch from './MovieSearch.vue';

export default {
  name: 'Header',
  components: { MovieSearch },
};
</script>

<style scoped lang="scss">
  @import "../scss/variables";

  .header {
    width: 100%;
    padding: 30px;
    background-color: $dark100;
  }
</style>
