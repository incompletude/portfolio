<template>
  <div
    class="stripe"
    :class="[width === 0 ? 'no-transition' : null]"
    :style="{ 'width': `${width}%` }"
  ></div>
</template>

<script>
export default {
  data() {
    return { width: 100 }
  },

  methods: {
    start() {
      this.width = 0
    },

    finish() {
      this.width = 100
    },

    increase(num) {
      this.width = num
    },
  }
}
</script>

<style lang="less" scoped>
// stripe

.stripe {
  .absolute;
  .width-full;
  height: 2px;
  .background-green-42;
  .transition-width;
  .transition-slow;
  .transition-linear;

  &.no-transition {
    .no-transition;
  }
}
</style>
