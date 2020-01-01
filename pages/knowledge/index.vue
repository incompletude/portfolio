<template>
  <div class="hero">
    <p class="error-code">404</p>
    <p class="error-message">Not yet, soon :)</p>
  </div>
</template>

<script>
export default {}
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
  .maison-neue-300-48\/56;
  .color-gray-77;
}

.error-message {
  .maison-neue-300-36\/48;
  .color-gray-21;
}
</style>
