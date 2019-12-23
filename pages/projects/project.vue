<template>
  <div class="row">
    <div class="col-12 margin-top-2 tl:col-3 tl:margin-bottom-3">
      <aside class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <div>
              <p class="heading-title">{{ title }}</p>
              <p class="heading-description">{{ description }}</p>
            </div>
            <div class="arrow-wrapper" @click="onHeadingArrowClick">
              <Arrow />
            </div>
          </header>
        </div>
        <div class="col-12">
          <Accordion :active="accordionActive">
            <div class="row">
              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Category</p>
                  <ul class="nav">
                    <!--<li v-for="category in categories">
                      <nuxt-link
                        class="nav-anchor"
                        :to="`/projects/category/${category.slug}/`"
                      >{{ category.name }}</nuxt-link>
                    </li>-->
                  </ul>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </aside>
    </div>

    <div class="col-12 margin-bottom-3 tl:col-9 tl:margin-top-2">b</div>
  </div>
</template>

<script>
import ProjectFactory from "~/contents/projects.js";

export default {
  async asyncData(context) {
    const route = context.route;
    const routeParams = route.params;
    const slug = routeParams.id;

    const projectFactory = await new ProjectFactory();
    const project = await projectFactory.find(slug);

    if (project) {
      return {
        slug: project.attributes.slug,
        title: project.attributes.title,
        description: project.attributes.description
      };
    } else {
      context.error({ statusCode: 404 });
      return false;
    }
  },

  data() {
    return { accordionActive: false };
  },

  methods: {
    onHeadingArrowClick(event) {
      this.accordionActive = !this.accordionActive;
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

  .on-tablet-landscape({& .arrow-wrapper {.none;}});
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
