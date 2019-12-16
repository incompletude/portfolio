<template>
  <main class="container-extra-large">
    <div class="hero">
      <div>
        <h1 class="hero-title">
          Hey, I’m a creative technologist from São Paulo, Brazil.
          <br />I can help you build and grow your next product.
        </h1>
        <p class="hero-copy">Have a project you’d like to discuss?</p>
        <p class="hero-copy">
          Let’s chat
          <a
            class="hero-mail"
            href="mailto:contato@andrefreitas.dev"
          >contato@andrefreitas.dev</a>
        </p>
      </div>
      <div class="hero-arrow">
        <Arrow :bounce="true" />
      </div>
    </div>

    <section class="margin-bottom-3 padding-top-1">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <AboutHeading>Featured project</AboutHeading>
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
          <AboutHeading>Worked with</AboutHeading>
        </div>
      </div>
      <div class="row">
        <div
          class="col-6 tp:col-4 tl:col-3 margin-bottom-1"
          v-for="project in distinctProjectsByPartner"
        >
          <AboutPartner :href="project.site">{{ project.partner }}</AboutPartner>
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <AboutHeading>Skills</AboutHeading>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-6 margin-bottom-2">hightlight</div>
        <div class="col-12 tp:col-6">
          <div class="row">
            <div class="col-12 margin-bottom-2">skill</div>
          </div>
        </div>
      </div>
    </section>

    <section class="margin-bottom-3">
      <div class="row">
        <div class="col-12 margin-bottom-2">
          <AboutHeading>Projects</AboutHeading>
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
          <AboutHeading>Hire me</AboutHeading>
        </div>
      </div>
      <div class="row">
        <div class="col-12 tp:col-8 margin-bottom-2">
          <p
            class="hire-copy"
          >So are you looking for a professional, communicative, punctual, and with extensive web development skills?</p>
          <p
            class="hire-copy"
          >If you have an application you are interested in developing, a problem that needs solving or a project that needs rescuing, I'd love to help you with it.</p>
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
import AboutHeading from "~/components/About/Heading";
import AboutPartner from "~/components/About/Partner";

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

  components: { Arrow, Figure, AboutHeading, AboutPartner },

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

  mounted() {
    console.log(this.recentProjects);
  }
};
</script>

<style lang="less" scoped>
// hero

.hero {
  .height-screen;
  .-margin-top-4;
  .padding-top-4;
  .flex;
  .flex-column;
  .justify-center;

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

  &:not(:last-child) {
    .padding-bottom-1;
  }
}

.hero-mail {
  .color-green-42;
  .transition-color;
  .transition-fast;
  .transition-linear;

  &:hover {
    .color-green-50;
  }
}

.hero-arrow {
  margin-left: -0.9rem;
  .padding-top-1;
}

// hire me

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


<!--

            <h3 class="skill__highlight">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit,
                sed do
                eiusmod
                tempor incididunt
            </h3>


                    <h3 class="skill-title">Backend</h3>
                    <p class="skill-description">
                        I'm proficient in multiple backend programming languages, and I have been focusing in microservices architeture built on top of .NET Core or Node.js for the last few years.
                    </p>


-->
