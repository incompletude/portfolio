<template>
  <img :class="`image ${size}`" v-lazy="imageSource" />
</template>

<script>
export default {
  props: {
    size: {
      validator(value) {
        return ["mobile", "desktop"].indexOf(value) > -1
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
.image {
  .block;
  .margin-x-auto;

  &.mobile {
    max-width: 240px; // 10 * 24
  }

  &.desktop {
    .max-width-full;
  }
}
</style>
