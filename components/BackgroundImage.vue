<template>
  <div :class="`image ${size}`">
    <div class="image-background" v-lazy:background-image="imageSource"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      validator(value) {
        return ["medium", "large"].indexOf(value) > -1
      }
    },
    image: {
      type: String,
      required: true
    }
  },

  computed: {
    imageSource() {
      return require(`~/assets/images${this.image}`)
    }
  }
}
</script>

<style lang="less" scoped>
// image

.image {
  .relative;
  .block;
  .background-gray-21;

  height: 288px; // 12 * 24
  .on-tablet-portrait({height: 336px;}); // (12 + 2) * 24
  .on-desktop({height: 384px;}); // (12 + 4) * 24

  &.large {
    height: 336px; // (12 + 2) * 24
    .on-tablet-portrait({height: 432px;}); // (12 + 6) * 24
    .on-desktop({height: 528px;}); // (12 + 10) * 24
  }
}

.image-background {
  .width-full;
  .height-full;
  .background-cover;
  .background-center;
  .opacity-0;
  .transition-opacity;
  .transition-linear;
  .transition-fast;

  &[lazy="loaded"] {
    .opacity-100;
  }
}
</style>
