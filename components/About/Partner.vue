<template>
  <h3>
    <a class="partner-title" target="_blank" rel="noopener noreferrer nofollow" :href="href">
      <slot></slot>
    </a>
  </h3>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.partner-title {
  .maison-neue-300-22\/40;
  .color-gray-77;
  .no-underline;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-42;
    .underline;
  }
}
</style>
