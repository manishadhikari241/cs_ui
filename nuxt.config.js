export default {
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'CollectionStock | Your Online Design Studio' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0e8dde' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/scss/global.scss',
    '~assets/scss/colors.scss'
  ],
  /*
  ** SCSS
  */
  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-infinite-loading',
    '~/plugins/vue-clipboard',
    '~/plugins/vue-braintree',
    '~/plugins/vue-html2canvas.client',
    '~/plugins/vue-wysiwyg',

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/moment',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // SCSS
    '@nuxtjs/style-resources',
    // Auth
    '@nuxtjs/auth',
    // Toaster
    '@nuxtjs/toast',
    // i18n
    ['nuxt-i18n', {
      locales: [
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        },
        {
          name: 'Chinese',
          code: 'ch',
          iso: 'zh-CN',
          file: 'zh-CN.js'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'en'
    }],
    // social sharing
    'vue-social-sharing/nuxt'
  ],


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:8000/api'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  /*
  ** Toaster
  */
  toast: {
    position: 'bottom-right',
    duration: 4000,
    theme: 'outline'
  },
  /*
  ** Auth
  */
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/me', method: 'get', propertyName: false }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true,
        autoLogout: true
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/'
    },
    watchLoggedIn: true
  },
  /*
  ** Routes
  */
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/cms',
        components: {
          default: resolve(__dirname, 'pages/cms/pages')
        }
      }),
        routes.push({
          path: '/CS*',
          components: {
            default: resolve(__dirname, 'pages/designs/redirect')
          }
        })
    }
  }
}
