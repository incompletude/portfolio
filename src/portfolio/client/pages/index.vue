<template>
  <div>
    <h1 class="red">v2</h1>
    <h3>Random dog of the day:</h3>
    <img :src="dog.url" alt />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const dogs = await $http.$get(
      "https://api.thedogapi.com/v1/images/search?limit=1"
    );
    return { dog: dogs[0] };
  }
};
</script>

<style lang="less">
.red {
  background-color: @gray; // will be resolved to #333
}
</style>
