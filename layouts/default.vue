<template>
  <div>
    <v-header />
    <div class="container-extra-large">
      <nuxt />
    </div>
    <v-footer />
  </div>
</template>
<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: { "v-header": Header, "v-footer": Footer }
};
</script>
