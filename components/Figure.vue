<template>
  <figure :class="`figure ${size}`">
    <nuxt-link :to="href">
      <v-background-image :size="size" :image="image">
        <div v-if="size === 'medium'" class="image-overlay" :style="overlayStyle">
          <h2 class="overlay-title">
            {{ title }}
            <br />—
          </h2>
          <h3 class="overlay-description">{{ description }}</h3>
        </div>
      </v-background-image>
    </nuxt-link>

    <figcaption class="figcaption">
      <h2>
        <nuxt-link class="figcaption-title" :to="href">{{ title }}</nuxt-link>
      </h2>
      <h3 class="figcaption-description">{{ description }}</h3>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    size: {
      validator(value) {
        return ["medium", "large"].indexOf(value) > -1
      }
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },

  computed: {
    overlayStyle() {
      return {
        "background-color": this.color
      };
    }
  }
};
</script>

<style lang="less" scoped>
// image

.image-overlay {
  .none;
  .absolute;
  .pin-top;
  .pin-left;
  .pin-right;
  .pin-bottom;
  .padding-1;
  .opacity-0;
  .transition-opacity;
  .transition-linear;
  .transition-fast;

  .figure:hover & {
    .opacity-100;
  }

  .on-tablet-landscape({.flex; .flex-column; .justify-between;});
}

// overlay

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

// figcaption

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
