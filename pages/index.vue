<template>
  <main class="container-extra-large">
    <div class="hero">
      <h1 class="hero-title">
        Hey, I’m a creative technologist from São Paulo, Brazil.
        <br />I can help you build and grow your next product.
      </h1>
      <p class="hero-copy">Have a project you’d like to discuss?</p>
      <p class="hero-copy">
        Let’s chat
        <a
          class="hero-copy-mail"
          href="mailto:contato@andrefreitas.dev"
        >contato@andrefreitas.dev</a>
      </p>
      <div class="hero-arrow" @click="onHeroArrowClick">
        <Arrow :bounce="true" />
      </div>
    </div>

    <section id="heroTarget" class="margin-bottom-3 padding-top-1">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h2 class="heading-title">Featured project</h2>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <Figure
            :large="true"
            :title="featuredProject.title"
            :description="featuredProject.description"
            :image="`projects/${featuredProject.slug}/${featuredProject.image}`"
            :color="featuredProject.color"
          />
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h2 class="heading-title">Worked with</h2>
          </header>
        </div>
      </div>
      <div class="row">
        <div
          class="col-6 tp:col-4 tl:col-3 margin-bottom-1"
          v-for="project in distinctProjectsByPartner"
        >
          <a
            class="partner-title"
            target="_blank"
            rel="noopener noreferrer nofollow"
            :href="project.site"
          >{{ project.partner }}</a>
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h2 class="heading-title">Skills</h2>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-6 margin-bottom-2">
          <h3
            class="skill-highlight"
          >Product development is hard. Managing projects is hard. Here are some things I’m good at, to help ease the pain.</h3>
        </div>

        <div class="col-12 tp:col-6">
          <div class="row">
            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">Design system</h3>
              <p
                class="skill-description"
              >I’m able to work with design teams to take designs from mockup to implementation in a structured way.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">Problem solving</h3>
              <p
                class="skill-description"
              >I can take vague problems and requirements and break them down into technical steps and solutions.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">System thinking</h3>
              <p
                class="skill-description"
              >I’m good at thinking abstractly and putting together systems with many moving parts.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12 margin-bottom-2">
              <h3 class="skill-title">Organizing</h3>
              <p class="skill-description">
                I’m good at organizing projects using tools like
                <a
                  class="skill-tool"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://www.notion.so"
                >Notion</a> and
                <a
                  class="skill-tool"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://jira.atlassian.com"
                >Jira</a>, present projects in a well-structured manner, and work to deadlines.
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
            <h2 class="heading-title">Projects</h2>
            <a class="heading-all" href="/projects/">View all</a>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-6 margin-bottom-2" v-for="project in recentProjects">
          <Figure
            :title="project.title"
            :description="project.description"
            :image="`projects/${project.slug}/${project.image}`"
            :color="project.color"
          />
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <header class="heading">
            <h2 class="heading-title">Hire me</h2>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-8 margin-bottom-2">
          <p
            class="hire-copy"
          >So are you looking for a professional, communicative, punctual, and with extensive web development skills?</p>
          <p
            class="hire-copy"
          >If you have an application you are interested in developing, a problem that needs solving or a project that needs rescuing, I’d love to help you with it.</p>
          <p class="hero-copy">
            Let’s chat
            <a
              class="hire-mail"
              href="mailto:contato@andrefreitas.dev"
            >contato@andrefreitas.dev</a>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Arrow from "~/components/Arrow";
import Figure from "~/components/Figure";
import slugs from "~/contents/projects.js";

export default {
  async asyncData({ app }) {
    async function asyncImport(slug) {
      const md = await import(`~/contents/projects/${slug}.md`);
      return md.attributes;
    }

    return Promise.all(slugs.map(slug => asyncImport(slug))).then(response => {
      return {
        projects: response
      };
    });
  },

  components: { Arrow, Figure },

  computed: {
    featuredProject() {
      return this.projects.find(p => p.featured === true);
    },

    distinctProjectsByPartner() {
      return this.projects.filter((e, i, projects) => {
        return projects.map(p => p.partner).indexOf(e.partner) === i;
      });
    },

    recentProjects() {
      return this.projects.slice(0, 4);
    }
  },

  methods: {
    onHeroArrowClick(event) {
      this.$scrollTo("#heroTarget");
    }
  },

  mounted() {}
};
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

.hero-title {
  .padding-bottom-1;
  .maison-neue-300-36\/48;
  .color-gray-77;
}

.hero-copy {
  .maison-neue-300-22\/32;
  .color-gray-77;
  .margin-bottom-1;
}

.hero-copy-mail {
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

.heading-all {
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

.partner-title {
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

.skill-tool {
  .color-gray-77;
  .underline;
}

// hire

.hire-copy {
  .maison-neue-300-22\/32;
  .color-gray-77;

  &:not(:last-child) {
    .padding-bottom-1;
  }
}

.hire-mail {
  .color-green-42;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-50;
  }
}
</style>
