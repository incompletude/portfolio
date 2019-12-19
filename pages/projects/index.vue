<template>
  <div class="row">
    <div class="col-12 margin-top-2 tl:col-3 tl:margin-bottom-3">
      <aside class="row">
        <div class="col-12 margin-bottom-2 tl:none">
          <header class="heading">
            <div>
              <h2 class="heading-title">Filter projects</h2>
              <p class="heading-description">By category, tag or year</p>
            </div>
            <div class="arrow-wrapper" @click="onHeadingArrowClick">
              <Arrow />
            </div>
          </header>
        </div>

        <div class="col-12">
          <div class="accordion" ref="accordion" :style="accordionStyle">
            <div class="row">
              <div class="col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <ul class="nav">
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/" exact>All 15 projects</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/featured/">Featured projects</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <h2 class="nav-name">Category</h2>
                  <ul class="nav">
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/category/client-work/">Client work</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link
                        class="nav-anchor"
                        to="/projects/category/product-development/"
                      >Product development</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link
                        class="nav-anchor"
                        to="/projects/category/product-management/"
                      >Product management</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <h2 class="nav-name">Tag</h2>
                  <ul class="nav">
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/tag/backend/">Backend</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/tag/database/">Database</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/tag/design-system/">Design system</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/tag/frontend/">Frontend</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/tag/tech-lead/">Tech lead</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/tag/ui-ux/">UI/UX</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <h2 class="nav-name">Year</h2>
                  <ul class="nav">
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/year/2019/">2019</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/year/2018/">2018</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/year/2017/">2017</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/year/2016/">2016</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/year/2015/">2015</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/year/2014/">2014</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="col-12 margin-bottom-3 tl:col-9 tl:margin-top-2">b</div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const route = context.route;
    const path = route.path;
    const params = route.params;
    const query = route.query;

    context.error({ statusCode: 500 });

    const featured = path.includes("featured") ? true : null;
    const category = path.includes("category") ? params.id : null;
    const tag = path.includes("tag") ? params.id : null;
    const year = path.includes("year") ? params.id : null;
    const page = query.page ? query.page : 1;
  },

  data() {
    return { accordionActive: false, accordionHeight: null };
  },

  computed: {
    accordionStyle() {
      return {
        height: this.accordionHeight
      };
    }
  },

  methods: {
    onHeadingArrowClick(event) {
      if (this.accordionActive) {
        this.accordionActive = false;
        this.accordionHeight = `${this.$refs.accordion.scrollHeight}px`;
        this.$nextTick(() => {
          this.accordionHeight = `0px`;
          setTimeout(() => (this.accordionHeight = null), 150);
        });
      } else {
        this.accordionActive = true;
        this.accordionHeight = `${this.$refs.accordion.scrollHeight}px`;
        setTimeout(() => (this.accordionHeight = "auto"), 150);
      }
    }
  }
};
</script>

<style lang="less" scoped>
// nav

.nav {
  .transition-height;
  .transition-fast;
  .transition-linear;
}

.nav-name {
  .padding-bottom-1\/2;
  .color-gray-21;
  .maison-neue-300-18\/24;
}

.nav-anchor {
  .maison-neue-300-18\/32;
  .color-gray-77;
  .no-underline;
  .transition-color;
  .transition-linear;
  .transition-fast;

  &.active,
  &:hover {
    .color-green-42;
  }
}

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

// accordion

.accordion {
  .height-0;
  .overflow-hidden;
  .transition-height;
  .transition-fast;
  .transition-linear;

  .on-tablet-landscape({.height-auto;});
}
</style>