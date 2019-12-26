<template>
  <div id="headerTarget">
    <div class="stripe"></div>

    <div class="arrow-wrapper" :class="arrowClass" @click="onArrowClick">
      <v-arrow color="light" direction="up" />
    </div>

    <div class="container-extra-large">
      <header class="header">
        <h1 class="brand">
          <nuxt-link class="brand-anchor" to="/">André Freitas</nuxt-link>
          <p class="brand-description">Creative technologist</p>
        </h1>

        <div>
          <div class="hamburger-wrapper" :class="hamburgerClass" @click="onHamburgerClick">
            <div class="hamburger">
              <div class="hamburger-bars">
                <span class="hamburger-bar"></span>
                <span class="hamburger-bar"></span>
              </div>
            </div>
          </div>

          <div class="nav-wrapper" :class="hamburgerClass">
            <ul class="nav">
              <li class="nav-item">
                <nuxt-link class="nav-anchor" to="/" exact @click.native="onAnchorClick">About</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-anchor" to="/projects/" @click.native="onAnchorClick">Projects</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-anchor"
                  to="/knowledge/"
                  @click.native="onAnchorClick"
                >Knowledge</nuxt-link>
              </li>
              <li class="nav-item">
                <a
                  class="nav-mail"
                  href="mailto:contato@andrefreitas.dev"
                  @click.native="onAnchorClick"
                >contato@andrefreitas.dev</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { arrowActive: false }
  },

  computed: {
    hamburgerClass() {
      return {
        active: this.$store.getters["header-nav/toggle"]
      }
    },
    arrowClass() {
      return {
        active: this.arrowActive
      }
    }
  },

  methods: {
    onScroll(e) {
      this.arrowActive = window.scrollY > 50 ? true : false
    },

    onHamburgerClick(e) {
      const body = document.body

      this.$store.getters["header-nav/toggle"] ?
        body.classList.remove("unscrollable") :
        body.classList.add("unscrollable")

      this.$store.dispatch("header-nav/toggle")
    },

    onAnchorClick(e) {
      const body = document.body
      body.classList.remove("unscrollable")

      this.$store.dispatch("header-nav/toggle")
    },

    onArrowClick(e) {
      this.$scrollTo("#headerTarget")
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  }
}
</script>

<style lang="less">
// html

html {
  .overflow-y-scroll;
}

// body

body {
  &.unscrollable {
    .fixed;

    .on-tablet-portrait({.static;});
  }
}

// selection

::selection {
  .background-green-42;
  .color-white;
}
</style>

<style lang="less" scoped>
// stripe

.stripe {
  .absolute;
  .width-full;
  height: 2px;
  .background-green-42;
}

// arrow

.arrow-wrapper {
  .fixed;
  .pin-right-1;
  .pin-bottom-1;
  .z-index-10;
  .invisible;
  .opacity-0;
  .translate-y-1\/2;
  .transition-all;
  .transition-ease-out;
  .transition-fast;

  &.active {
    .visible;
    .opacity-100;
    .translate-y-0;
  }
}

// header

.header {
  .height-4;
  .flex;
  .justify-between;
  .items-center;

  .on-desktop({.height-5;});
}

// brand

.brand {
  .flex;
  .flex-column;
}

.brand-anchor {
  .maison-neue-300-18\/24;
  .color-gray-77;
  .no-underline;
  .transition-color;
  .transition-linear;
  .transition-fast;

  &:hover {
    .color-green-42;
  }
}

.brand-description {
  .maison-neue-300-17\/24;
  .color-gray-21;
}

// hamburger

.hamburger-wrapper {
  .relative;
  .z-index-30;

  .on-tablet-portrait({.none;});
}

.hamburger {
  .width-5\/3;
  .height-5\/3;
  .cursor-pointer;
  .flex;
  .justify-center;
  .items-center;
}

.hamburger-bars {
  .pointer-events-none;
  .flex;
  .flex-column;
  .items-end;
  .justify-center;
}

.hamburger-bar {
  height: 2px;
  .background-gray-77;
  .transition-all;
  .transition-ease-out;
  .transition-fast;

  &:first-child {
    width: 24px;
    margin-bottom: 6px;
    .transform-origin-top-right;
  }

  &:last-child {
    width: 16px;
    .transform-origin-bottom-right;
  }

  .hamburger-wrapper.active & {
    width: 25px;
    .background-green-42;

    &:first-child {
      margin-bottom: 15px;
      .-rotate-45;
    }

    &:last-child {
      .rotate-45;
    }
  }
}

// nav

.nav-wrapper {
  .invisible;
  .fixed;
  .pin-top;
  .pin-left;
  .pin-right;
  .pin-bottom;
  .padding-1;
  .background-white;
  .opacity-0;
  .z-index-20;
  .transition-all;
  .transition-linear;
  .transition-fast;

  .on-tablet-portrait({.visible; .static; .padding-0; .opacity-100;});

  &.active {
    .visible;
    .opacity-100;
  }
}

.nav {
  .margin-top-4;
  .flex;
  .flex-column;
  .items-end;

  .on-tablet-portrait({.margin-top-auto; .flex-row;});
}

.nav-item {
  .padding-bottom-1;
  .opacity-0;
  .translate-y-1\/2;
  .transition-all;
  .transition-ease-out;
  .transition-fast;

  .nav-wrapper.active & {
    .opacity-100;
    .translate-y-0;
  }

  .on-tablet-portrait(
    {.padding-left-1; .padding-bottom-0; .opacity-100; .translate-y-0;}
  );
}

.nav-anchor,
.nav-mail {
  .maison-neue-300-18\/24;
  .no-underline;
  .transition-color;
  .transition-linear;
  .transition-fast;

  &:hover,
  &.active {
    .color-green-42;
  }
}

.nav-anchor {
  .color-gray-77;
}

.nav-mail {
  .color-gray-21;
}
</style>
