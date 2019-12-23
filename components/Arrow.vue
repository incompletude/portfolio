<template>
  <div class="arrow" :class="[color, direction, bounce ? 'bounce' : '']">
    <span class="arrow-bar"></span>
    <span class="arrow-bar"></span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      validator(value) {
        return ["light", "dark"].indexOf(value) > -1
      },
      required: true
    },
    direction: {
      validator(value) {
        return ["up", "down"].indexOf(value) > -1
      },
      required: true
    },
    bounce: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.arrow {
  .flex;
  .justify-center;
  .items-center;
  .width-5\/3;
  .height-5\/3;
  .cursor-pointer;

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

  .arrow.light & {
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
