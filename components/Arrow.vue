<template>
  <div class="arrow" :class="arrowClass">
    <span class="arrow-bar"></span>
    <span class="arrow-bar"></span>
  </div>
</template>

<script>
export default {
  props: {
    up: {
      type: Boolean,
      default: false
    },
    lighter: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    arrowClass() {
      return {
        up: this.up,
        lighter: this.lighter,
        bounce: this.bounce
      };
    }
  }
};
</script>

<style lang="less" scoped>
.arrow {
  .width-5\/3;
  .height-5\/3;
  .cursor-pointer;
  .flex;
  .justify-center;
  .items-center;

  &.up {
    .rotate-180;
  }

  &.bounce {
    .bounce;
    .duration-2;
    .animation-infinite;
  }
}

.arrow-bar {
  width: 16px;
  height: 2px;
  margin-top: 11px;
  .background-gray-77;
  .pointer-events-none;

  .arrow.lighter & {
    .background-gray-21;
  }

  &:first-child {
    .transform-origin-bottom-right;
    .rotate-45;
  }

  &:last-child {
    .transform-origin-bottom-left;
    .-rotate-45;
  }
}
</style>
