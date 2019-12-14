<template>
  <div>
    <header-nav />

    <nuxt />
  </div>
</template>
<script>
import HeaderNav from '~/components/HeaderNav'

export default {
  components: { 'header-nav': HeaderNav },
}
</script>
