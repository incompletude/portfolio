<template>
  <main class="container-extra-large">
    <div class="hero">
      <div>
        <h1 class="hero-title">
          Hey, I’m a creative technologist from São Paulo, Brazil.
          <br />I can help you build your next product.
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
        <div class="col-6 tp:col-4 tl:col-3 margin-bottom-1" v-for="project in distinctProjects">
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
        <div class="col-12 tp:col-6 margin-bottom-2">
          <Figure
            :title="featuredProject.title"
            :description="featuredProject.description"
            :image="`projects/${featuredProject.slug}/${featuredProject.image}`"
            :color="featuredProject.color"
          />
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

    distinctProjects() {
      return this.projects.filter((e, i, projects) => {
        return projects.map(p => p.partner).indexOf(e.partner) === i;
      });
    }
  },

  mounted() {
    console.log(this.featuredProject);
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

                <div class="col-12 margin-bottom-2">

                    <h3 class="skill__title">Database</h3>
                    <p class="skill__description">
                        I'm confortable designing and implementing performant databases in both SQL and NoSQL environments.
                    </p>
                </div>

                <div class="col-12 margin-bottom-2">

                    <h3 class="skill__title">Frontend</h3>
                    <p class="skill__description">
                        I'm proficient in most all of the languages, libraries and tools required by the modern web development environment.
                    </p>
                </div>

                <div class="skill__accordion" data-controller="skill-accordion">

                    <div class="col-12">

                        <a class="skill__anchor active" data-action="click->skill-accordion#open">See the rest</a>
                    </div>

                    <div class="col-12 margin-bottom-2">

                        <h3 class="skill__title">Design Pattern</h3>
                        <p class="skill__description">
                            I understand the importance of future-proof software, and I have applied multiple design patterns to aid further software development along the years.
                        </p>
                    </div>

                    <div class="col-12 margin-bottom-2">

                        <h3 class="skill__title">Design System</h3>
                        <p class="skill__description">
                            While I'm not a graphic designer, I have an eye for good design and typography. I'm confortable using Photoshop, Illustrator and Sketch, and I'm able to work with design teams to take designs from mock-up to implementation.
                        </p>
                    </div>

                    <div class="col-12 margin-bottom-2">

                        <h3 class="skill__title">UI & UX</h3>
                        <p class="skill__description">
                            I recognize the importance of user focused UI and UX design, and I'm confortable working along with other pixel perfect maniacs to craft user centered digital experiencies.
                        </p>
                    </div>

                    <div class="col-12 margin-bottom-2">

                        <h3 class="skill__title">Documentation</h3>
                        <p class="skill__description">
                            Often overlooked, I think it's important to have a clear picture of the current development stage to aid the next development round.
                        </p>
                    </div>

                    <div class="col-12 margin-bottom-2">

                        <h3 class="skill__title">Project Management</h3>
                        <p class="skill__description">
                            Leading multiple projects along the years, I understand the importance of identifyng the stages of a project and working to a schedule around those.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

-->
