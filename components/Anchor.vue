<template>
  <a
    :target="juice ? null : '_blank'"
    :rel="juice ? null : 'noopener noreferrer nofollow'"
    :href="href"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    juice: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
</style>
