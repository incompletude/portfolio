<template>
  <header class="heading">
    <div>
      <p class="heading-title">Filter projects</p>
      <p class="heading-description">By category, tag or year</p>
    </div>
    <div class="arrow-wrapper" @click="onArrowClick">
      <Arrow />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  },

  methods: {
    onArrowClick() {
      this.$emit("arrow-click");
    }
  }
};
</script>

<style lang="less" scoped>
// heading

.heading {
  .flex;
  .justify-between;
  .items-center;
}

.heading-title {
  .maison-neue-300-22\/32;
  .color-gray-77;
}

.heading-description {
  .maison-neue-300-20\/32;
  .color-gray-21;
}
</style>
