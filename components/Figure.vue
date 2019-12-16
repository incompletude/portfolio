<template>
  <figure class="figure" :class="figureClass">
    <a class="figure-image" href="/projects/">
      <div class="figure-image-background" v-lazy:background-image="imageSource"></div>
      <div v-if="!large" class="figure-image-overlay" :style="{ 'background-color': color }">
        <h3 class="overlay-title">
          {{ title }}
          <br />—
        </h3>
        <p class="overlay-description">{{ description }}</p>
      </div>
    </a>

    <figcaption class="figcaption">
      <h3>
        <a class="figcaption-title" href="/projects/">{{ title }}</a>
      </h3>
      <p class="figcaption-description">{{ description }}</p>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },

  computed: {
    imageSource() {
      return require(`../assets/images/${this.image}`);
    },
    figureClass() {
      return {
        large: this.large
      };
    }
  }
};
</script>

<style lang="less" scoped>
// figure

.figure-image {
  .relative;
  .block;
  .background-gray-77;

  height: 288px; // 12 * 24
  .on-tablet-portrait({height: 336px;}); // (12 + 2) * 24
  .on-desktop({height: 384px;}); // (12 + 4) * 24

  .figure.large & {
    height: 336px; // (12 + 2) * 24
    .on-tablet-portrait({height: 432px;}); // (12 + 6) * 24
    .on-desktop({height: 528px;}); // (12 + 10) * 24
  }
}

.figure-image-background {
  .width-full;
  .height-full;
  .background-cover;
  .background-center;
  .opacity-0;
  .transition-opacity;
  .transition-linear;
  .transition-fast;

  &[lazy="loaded"] {
    .opacity-100;
  }
}

.figure-image-overlay {
  .absolute;
  .pin-top;
  .pin-left;
  .pin-right;
  .pin-bottom;
  .padding-1;
  .opacity-0;
  .flex;
  .flex-column;
  .justify-between;
  .transition-opacity;
  .transition-linear;
  .transition-fast;

  .figure:hover & {
    .opacity-100;
  }
}

.overlay-title,
.overlay-description {
  .color-white;
  .translate-y-1\/2;
  .transition-transform;
  .transition-ease-out;
  .transition-fast;

  .figure:hover & {
    .translate-y-0;
  }
}

.overlay-title {
  .maison-neue-300-20\/32;
}

.overlay-description {
  .maison-neue-300-18\/24;
}

.figcaption {
  .margin-top-1\/2;

  .on-tablet-landscape({.none;});

  .figure.large & {
    .block;
  }
}

.figcaption-title {
  .maison-neue-300-20\/32;
  .color-gray-77;
  .no-underline;

  &:hover {
    .underline;
  }
}

.figcaption-description {
  .maison-neue-300-16\/24;
  .color-gray-21;
}
</style>
