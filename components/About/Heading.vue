<template>
  <header class="heading">
    <h2 class="heading-title">
      <slot></slot>
    </h2>
  </header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// heading

.heading {
  .flex;
  .justify-between;
}

.heading-title {
  .maison-neue-300-20\/32;
  .color-gray-21;
}
</style>

<!--
            <header class="about-header">
                <h2 class="about-header__title">Recent Work</h2>
                <a class="about-header__anchor" href="/projects/">View all</a>
            </header>
-->
