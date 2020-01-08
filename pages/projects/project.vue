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
              <v-arrow color="dark" direction="down" />
            </div>
          </header>
        </div>
        <div class="col-12">
          <v-accordion :active="accordionActive">
            <div class="row">
              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Category</p>
                  <ul class="nav">
                    <li v-for="category in categories">
                      <nuxt-link
                        class="nav-anchor"
                        :to="`/projects/category/${category.slug}/`"
                      >{{ category.name }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Tag</p>
                  <ul class="nav">
                    <li v-for="tag in tags">
                      <nuxt-link
                        class="nav-anchor"
                        :to="`/projects/tag/${tag.slug}/`"
                      >{{ tag.name }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Year</p>
                  <ul class="nav">
                    <li>
                      <nuxt-link class="nav-anchor" :to="`/projects/year/${year}/`">{{ year }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Site</p>
                  <ul class="nav">
                    <li>
                      <a
                        class="nav-anchor"
                        :href="site"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >{{ site }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </v-accordion>
        </div>
      </aside>
    </div>

    <div class="col-12 margin-bottom-3 tl:col-9 tl:margin-top-2">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <v-background-image size="large" :image="`/projects/${slug}/${image}`" />
        </div>
        <div class="col-12 margin-bottom-2">
          <v-dynamic-markdown
            class="markdown"
            :render-func="renderFunc"
            :static-render-funcs="staticRenderFuncs"
          />
        </div>
        <div class="col-12 tl:col-7"></div>
        <div class="col-12 tl:col-5 margin-bottom-2">
          <div class="project-nav" v-if="projectPrevious">
            <p class="project-nav-title">Previous project</p>
            <nuxt-link
              class="project-nav-anchor"
              :to="`/projects/${projectPrevious.slug}`"
            >{{ projectPrevious.title }}</nuxt-link>
          </div>

          <div class="project-nav" v-if="projectNext">
            <p class="project-nav-title">Next project</p>
            <nuxt-link
              class="project-nav-anchor"
              :to="`/projects/${projectNext.slug}`"
            >{{ projectNext.title }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectFactory from "~/contents/projects.js"

export default {
  async asyncData(context) {
    const route = context.route
    const routeParams = route.params
    const slug = routeParams.id

    const projectFactory = await new ProjectFactory()
    const project = projectFactory.find(slug)
    const projectPrevious = projectFactory.findPrevious(slug)
    const projectNext = projectFactory.findNext(slug)

    if (project) {
      return {
        slug: project.attributes.slug,
        title: project.attributes.title,
        description: project.attributes.description,
        categories: Object.entries(project.attributes.categories).map(([slug, name]) => ({ slug, name })),
        tags: Object.entries(project.attributes.tags).map(([slug, name]) => ({ slug, name })),
        year: project.attributes.year,
        site: project.attributes.site,
        image: project.attributes.image,
        renderFunc: `${project.vue.render}`,
        staticRenderFuncs: `${project.vue.staticRenderFns}`,
        projectPrevious: projectPrevious ? projectPrevious.attributes : null,
        projectNext: projectNext ? projectNext.attributes : null,
      }
    } else {
      context.error({ statusCode: 404 })
      return false
    }
  },

  data() {
    return { accordionActive: false }
  },

  methods: {
    onHeadingArrowClick(event) {
      this.accordionActive = !this.accordionActive
    }
  }
}
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

// nav

.nav-name {
  .padding-bottom-1\/2;
  .color-gray-21;
  .maison-neue-300-16\/24;
}

.nav-anchor {
  .maison-neue-300-16\/24;
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

// project nav

.project-nav {
  .padding-bottom-1;

  &:last-of-type {
    .padding-bottom-0;
  }
}

.project-nav-title {
  .maison-neue-300-20\/32;
  .color-gray-77;
}

.project-nav-anchor {
  .maison-neue-300-22\/32;
  .color-green-42;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-50;
  }
}
</style>

<style lang="less">
.markdown {
  & p {
    .padding-bottom-1;
    .maison-neue-300-20\/32;
    .color-gray-77;
  }

  & strong {
    .font-weight-medium;
  }

  & a {
    .color-gray-77;
    .underline;
  }
}
</style>
