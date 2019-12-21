<template>
  <div class="accordion" ref="accordion" :style="accordionStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return { height: null };
  },

  computed: {
    accordionStyle() {
      return {
        height: this.height
      };
    }
  },

  watch: {
    active(val) {
      if (val) {
        this.height = `${this.$refs.accordion.scrollHeight}px`;
        setTimeout(() => (this.height = "auto"), 150);
      } else {
        this.height = `${this.$refs.accordion.scrollHeight}px`;
        setTimeout(() => (this.height = "0px"), 1);
        setTimeout(() => (this.height = null), 150);
      }
    }
  }
};
</script>

<style lang="less" scoped>
// accordion

.accordion {
  .height-0;
  .overflow-hidden;
  .transition-height;
  .transition-fast;
  .transition-linear;

  .on-tablet-landscape({.height-auto;});
}
</style>
