const path = require("path")
const Mode = require("frontmatter-markdown-loader/mode")

const baseUrl = "https://andrefreitas.dev"
const title = "André Freitas | Product owner, full stack developer & UI/UX designer"
const description = "Hey, I’m a creative technologist from São Paulo, Brazil. I can help you build and grow your next product."
const builtAt = new Date().toISOString()

module.exports = {
  head: {
    title: title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "André Freitas" },
      { name: "description", property: "og:description", content: description, hid: "description" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: baseUrl },
      { property: "og:type", content: "profile" },
      { property: "og:updated_time", content: builtAt }
    ],
    htmlAttrs: {
      style: "opacity:0;pointer-events:none;"
    },
  },

  loading: "~/components/LoadingStripe.vue",

  buildModules: [
    "@nuxtjs/google-analytics"
  ],

  googleAnalytics: {
    id: "UA-155233690-1"
  },

  modules: [
    "@nuxtjs/style-resources",
    "nuxt-webfontloader"
  ],

  styleResources: {
    less: "./assets/less/main.less"
  },

  webfontloader: {
    custom: {
      families: ["Maison Neue"],
      urls: ["/fonts/fonts.css"]
    }
  },

  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",

    extendRoutes(routes, resolve) {
      routes.push({
        path: "/projects/featured/",
        component: resolve(__dirname, "pages/projects/index.vue")
      })

      routes.push({
        path: "/projects/category/:id/",
        component: resolve(__dirname, "pages/projects/index.vue")
      })

      routes.push({
        path: "/projects/tag/:id/",
        component: resolve(__dirname, "pages/projects/index.vue")
      })

      routes.push({
        path: "/projects/year/:id/",
        component: resolve(__dirname, "pages/projects/index.vue")
      })

      routes.push({
        path: "/projects/:id/",
        component: resolve(__dirname, "pages/projects/project.vue")
      })
    }
  },

  build: {
    extend(config) {
      const rule = config.module.rules.find(r => r.test.toString() === "/\\.(png|jpe?g|gif|svg|webp)$/i")
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        include: path.resolve(__dirname, "contents"),
        options: {
          mode: [Mode.VUE_RENDER_FUNCTIONS],
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          placeholder: true,
          quality: 90,
          size: 1400,
          adapter: require("responsive-loader/sharp")
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 1000,
          name: "img/[name].[hash:7].[ext]"
        }
      })
    }
  },

  plugins: [
    "~/plugins/globalComponents",
    { src: "~/plugins/scrollto", ssr: false },
    { src: "~/plugins/lazyload", ssr: false },
  ],
}
