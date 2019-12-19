const builtAt = new Date().toISOString()
const path = require('path')
import Mode from 'frontmatter-markdown-loader/mode'

module.exports = {
  head: {
    title: 'André Freitas | Product owner, full stack developer & UI/UX designer | São Paulo, Brazil',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt }
    ]
  },

  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',

    extendRoutes(routes, resolve) {
      routes.push({
        path: "/projects/featured/",
        component: resolve(__dirname, "pages/projects/index.vue")
      });

      routes.push({
        path: "/projects/category/:id/",
        component: resolve(__dirname, "pages/projects/index.vue")
      });

      routes.push({
        path: "/projects/tag/:id/",
        component: resolve(__dirname, "pages/projects/index.vue")
      });

      routes.push({
        path: "/projects/year/:id/",
        component: resolve(__dirname, "pages/projects/index.vue")
      });

      routes.push({
        path: "/projects/:id/",
        component: resolve(__dirname, "pages/projects/project.vue")
      });
    }
  },

  build: {
    extend(config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          mode: [Mode.VUE_RENDER_FUNCTIONS],
          vue: {
            root: 'dynamicMarkdown'
          }
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          size: 1400,
          adapter: require('responsive-loader/sharp')
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      })
    }
  },

  plugins: ['~/plugins/globalComponents', '~/plugins/lazyload', '~/plugins/scrollto', { src: '~plugins/ga.js', ssr: false }],

  modules: [
    '@nuxtjs/style-resources',
    'nuxt-webfontloader'
  ],

  styleResources: {
    less: './assets/less/main.less',
  },

  webfontloader: {
    custom: {
      families: ['Maison Neue'],
      urls: ['/fonts/fonts.css']
    }
  },

  generate: {
  }
}