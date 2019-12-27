<template>
  <div class="hero">
    <p class="error-code">{{ error.statusCode }}</p>
    <p class="error-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["error"],

  data() {
    return {
      message:
        this.error.statusCode === 404
          ? "Page not found :("
          : "An error occurred :("
    };
  },

  head() {
    return {
      title: this.message
    };
  }
};
</script>

<style lang="less" scoped>
.hero {
  .flex;
  .flex-column;
  .justify-center;
  .height-screen;
  .-margin-top-4;
  .padding-top-4;

  .on-desktop({.-margin-top-5; .padding-top-5;});
}

.error-code {
  .padding-bottom-1;
  .maison-neue-300-48\/56;
  .color-gray-77;
}

.error-message {
  .maison-neue-300-36\/48;
  .color-gray-21;
}
</style>
