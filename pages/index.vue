<template>
  <div>
    <div class="hero">
      <h1 class="hero-highlight">
        Hey, I’m a creative technologist from São Paulo, Brazil.
        <br />I can help you build and grow your next product.
      </h1>
      <p class="hero-description">Have a project you’d like to discuss?</p>
      <p class="hero-description">
        Let’s chat
        <a
          class="hero-description-mail"
          href="mailto:contato@andrefreitas.dev"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >contato@andrefreitas.dev</a>
      </p>
      <div class="hero-arrow" @click="onHeroArrowClick">
        <v-arrow color="dark" direction="down" :bounce="true" />
      </div>
    </div>

    <section id="heroTarget" class="margin-bottom-3 padding-top-1">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h1 class="heading-title">Featured project</h1>
          </header>
        </div>
      </div>

      <div class="row">
        <div class="col-12 margin-bottom-2">
          <v-figure
            size="large"
            :title="projectFeatured.title"
            :description="projectFeatured.description"
            :href="`/projects/${projectFeatured.slug}`"
            :image="`/projects/${projectFeatured.slug}/${projectFeatured.image}`"
            :color="projectFeatured.color"
          />
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h1 class="heading-title">Worked with</h1>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-6 tp:col-4 tl:col-3 margin-bottom-1" v-for="project in projectsPartners">
          <a
            class="partner-anchor"
            :href="project.site"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >{{ project.partner }}</a>
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h1 class="heading-title">Skills</h1>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-6 margin-bottom-2">
          <h2
            class="skill-highlight"
          >Product development is hard. Managing projects is hard. Here are some things I’m good at, to help ease the pain.</h2>
        </div>

        <div class="col-12 tp:col-6">
          <div class="row">
            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">Design system</h3>
              <p
                class="skill-description"
              >I’m able to work with design teams to take designs from mockup to implementation in a structured way.</p>
            </div>

            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">Problem solving</h3>
              <p
                class="skill-description"
              >I can take vague problems and requirements and break them down into technical steps and solutions.</p>
            </div>

            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">System thinking</h3>
              <p
                class="skill-description"
              >I’m good at thinking abstractly and putting together systems with many moving parts.</p>
            </div>

            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">Organizing</h3>
              <p class="skill-description">
                I’m good at organizing projects using tools like
                <a
                  class="skill-description-anchor"
                  href="https://www.notion.so"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >Notion</a> and
                <a
                  class="skill-description-anchor"
                  href="https://jira.atlassian.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >Jira</a>, at presenting projects in a well-structured manner, and in working to meet deadlines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h1 class="heading-title">Projects</h1>
            <nuxt-link class="heading-anchor" to="/projects/">View all</nuxt-link>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-6 margin-bottom-2" v-for="project in projectsRecent">
          <v-figure
            size="medium"
            :title="project.title"
            :description="project.description"
            :href="`/projects/${project.slug}`"
            :image="`/projects/${project.slug}/${project.image}`"
            :color="project.color"
          />
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h1 class="heading-title">Hire me</h1>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-8 margin-bottom-2">
          <p
            class="hire-description"
          >Are you looking for a professional who’s communicative, punctual, and with extensive web development skills?</p>
          <p
            class="hire-description"
          >If you have an application you are interested in developing, a problem that needs solving or a project that needs rescuing, I’d love to help you with it.</p>
          <p class="hire-description">
            Let’s chat
            <a
              class="hire-description-mail"
              href="mailto:contato@andrefreitas.dev"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >contato@andrefreitas.dev</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectFactory from "~/contents/projects.js"

export default {
  async asyncData(context) {
    const projectFactory = await new ProjectFactory()
    const projectFeatured = projectFactory.findByFeatured()
    const projectsPartners = projectFactory.getByPartners()
    const projectsRecent = projectFactory.getByRecent()

    return {
      projectFeatured: projectFeatured.attributes,
      projectsPartners: projectsPartners.map(p => p.attributes),
      projectsRecent: projectsRecent.map(p => p.attributes)
    }
  },

  methods: {
    onHeroArrowClick(event) {
      this.$scrollTo("#heroTarget")
    }
  },

  mounted() { }
}
</script>

<style lang="less" scoped>
// hero

.hero {
  .flex;
  .flex-column;
  .justify-center;
  .height-screen;
  .-margin-top-4;
  .padding-top-4;

  .on-desktop({.-margin-top-5; .padding-top-5;});
}

.hero-highlight {
  .padding-bottom-1;
  .maison-neue-300-36\/48;
  .color-gray-77;
}

.hero-description {
  .padding-bottom-1;
  .maison-neue-300-22\/32;
  .color-gray-77;
}

.hero-description-mail {
  .color-green-42;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-50;
  }
}

.hero-arrow {
  .self-start;
  margin-left: -0.9rem;
}

// heading

.heading {
  .flex;
  .justify-between;
  .items-center;
}

.heading-title {
  .maison-neue-300-20\/32;
  .color-gray-21;
}

.heading-anchor {
  .maison-neue-300-18\/24;
  .color-gray-77;
  .no-underline;
  .transition-color;
  .transition-linear;
  .transition-fast;

  &:hover {
    .color-green-42;
    .underline;
  }
}

// partner

.partner-anchor {
  .maison-neue-300-22\/32;
  .color-gray-77;
  .no-underline;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-42;
    .underline;
  }
}

// skill

.skill-highlight {
  .padding-right-1;
  .maison-neue-300-24\/32;
  .color-gray-77;
}

.skill-title {
  .padding-bottom-1\/2;
  .maison-neue-300-22\/32;
  .color-gray-77;
}

.skill-description {
  .maison-neue-300-20\/32;
  .color-gray-77;
}

.skill-description-anchor {
  .color-gray-77;
  .underline;
}

// hire

.hire-description {
  .maison-neue-300-22\/32;
  .color-gray-77;
  .padding-bottom-1;

  &:last-of-type {
    .padding-bottom-0;
  }
}

.hire-description-mail {
  .color-green-42;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-50;
  }
}
</style>
