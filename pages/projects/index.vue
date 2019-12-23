<template>
  <div class="row">
    <div class="col-12 margin-top-2 tl:col-3 tl:margin-bottom-3">
      <aside class="row">
        <div class="col-12 margin-bottom-2 tl:none">
          <header class="heading">
            <div>
              <p class="heading-title">Filter projects</p>
              <p class="heading-description">By category, tag or year</p>
            </div>
            <div class="arrow-wrapper" @click="onHeadingArrowClick">
              <Arrow />
            </div>
          </header>
        </div>

        <div class="col-12">
          <Accordion :active="accordionActive">
            <div class="row">
              <div class="col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <ul class="nav">
                    <li>
                      <nuxt-link
                        class="nav-anchor"
                        to="/projects/"
                        exact
                      >All {{ projectsCount }} projects</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="nav-anchor" to="/projects/featured/">Featured projects</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Category</p>
                  <ul class="nav">
                    <li v-for="category in categories">
                      <nuxt-link
                        class="nav-anchor"
                        :to="`/projects/category/${category.key}/`"
                      >{{ category.value }}</nuxt-link>
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
                        :to="`/projects/tag/${tag.key}/`"
                      >{{ tag.value }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-12 tp:col-4 tl:col-12 margin-bottom-2">
                <div class="nav-wrapper">
                  <p class="nav-name">Year</p>
                  <ul class="nav">
                    <li v-for="year in years">
                      <nuxt-link class="nav-anchor" :to="`/projects/year/${year}/`">{{ year }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </aside>
    </div>

    <div class="col-12 margin-bottom-3 tl:col-9 tl:margin-top-2">
      <div class="row">
        <div class="col-12 tp:col-6 margin-bottom-2" v-for="project in projects">
          <Figure
            :title="project.title"
            :description="project.description"
            :href="`/projects/${project.slug}`"
            :image="`/projects/${project.slug}/${project.image}`"
            :color="project.color"
          />
        </div>

        <div class="col-12 margin-top-2 margin-bottom-2" v-if="pageCount > 1">
          <div class="pagination-wrapper">
            <p class="pagination-separator">—</p>
            <ul class="pagination">
              <li v-if="currentPage > 1">
                <nuxt-link class="pagination-anchor" :to="`?page=${currentPage - 1}`">Previous</nuxt-link>
              </li>
              <li v-for="index in pageCount">
                <span class="pagination-index" v-if="currentPage === index">{{ index }}</span>
                <nuxt-link class="pagination-anchor" v-else :to="`?page=${index}`">{{ index }}</nuxt-link>
              </li>
              <li v-if="currentPage < pageCount">
                <nuxt-link class="pagination-anchor" :to="`?page=${currentPage + 1}`">Next</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectFactory from "~/contents/projects.js";

export default {
  watchQuery: ["page"],

  async asyncData(context) {
    const route = context.route;
    const routePath = route.path;
    const routeParams = route.params;
    const routeQuery = route.query;

    const featured = routePath.includes("featured") ? true : null;
    const category = routePath.includes("category") ? routeParams.id : null;
    const tag = routePath.includes("tag") ? routeParams.id : null;
    const year = routePath.includes("year") ? parseInt(routeParams.id) : null;
    const page = routeQuery.page ? parseInt(routeQuery.page) : 1;

    const projectFactory = await new ProjectFactory();
    const categories = projectFactory.getDistinctCategories();
    const tags = projectFactory.getDistinctTags();
    const years = projectFactory.getDistinctYears();
    const projectsPage = projectFactory.getPage(
      featured,
      category,
      tag,
      year,
      page
    );

    if (projectsPage) {
      return {
        categories: categories,
        tags: tags,
        years: years,
        projects: projectsPage.projects.map(p => p.attributes),
        currentPage: projectsPage.currentPage,
        pageCount: projectsPage.pageCount,
        projectsCount: projectsPage.projectsCount
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
  },

  head() {
    return {
      title: "Projects | André Freitas"
    };
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

// nav

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

// pagination

.pagination-separator {
  .padding-bottom-1\/2;
  .color-gray-77;
  .maison-neue-300-18\/24;
}

.pagination {
  .flex;
}

.pagination-index {
  .color-gray-77;
  .maison-neue-300-20\/32;
  .margin-right-1;
  .underline;
}

.pagination-anchor {
  .color-gray-77;
  .maison-neue-300-20\/32;
  .margin-right-1;
  .no-underline;

  &:hover {
    .underline;
  }
}
</style>
