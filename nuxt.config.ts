import * as fs from 'fs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

/**
 * Returns all locales with their corresponding file names from `./locales`.
 */
function getLocales (): { code: string; file: string }[] {
  const files = fs.readdirSync('./locales')

  return files.map((file) => {
    return {
      code: file.split('.')[0],
      file
    }
  })
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no',
      meta: [
        {
          name: 'keywords',
          content:
            'eden'
        }
      ],
      title: 'EDEN',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
        }
      ],
      style: [],
      script: [
        {
          hid: 'gtmHead',
          innerHTML: ``,
        },
      ],
      noscript: []
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
        }
      }
    }
  },

  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: process.env.API_URL,
      defaultLang: 'en',
      enviroment: process.env.ENVIRONMENT || 'mainnet',
      titlePage: process.env.TITLE,
      enableMultiLang: process.env.ENABLE_MULTI_LANGUAGE
    }
  },

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(nodePolyfills())
    }
  },

  css: ['@/assets/scss/index.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image', '@element-plus/nuxt', 'nuxt-lodash'],

  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'],
      ['kebabCase', 'stringToKebab'],
      ['isDate', 'isLodashDate'],
      ['isNil', 'isNil']
    ]
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    locales: getLocales(),
    defaultLocale: process.env.DEFAULT_LANG || 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: false,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  experimental: {
    externalVue: false,
    extends: 'content-wind',
    experimental: {
      watcher: 'chokidar'
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: process.env.LISTEN_PORT || 3000
  },

  plugins: [],

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }

})
