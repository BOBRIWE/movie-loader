<template>
  <section v-if="error !== null" class="error">{{error.message}}</section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
@Component
export default class Error extends Vue {
  @Prop() private error!: Error;
}
</script>

<style scoped lang="scss">
.error {
  border: 2px solid red;
  background-color: rgba(255, 0, 0, .2);
  padding: 40px;
  text-align: center;
  vertical-align: center;
}
</style>
