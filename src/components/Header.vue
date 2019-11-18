<template>
  <header class="header"></header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
  @import "../scss/variables";

  .header {
    width: 100%;
    height: 60px;
    background-color: $dark100;
  }
</style>
