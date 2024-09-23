import viLocale from 'element-plus/dist/locale/vi.mjs'
import enLocale from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import appStore from '~/store/app'
import { LANG_KEY } from '~/utils/constants'
import { useEnableMultiLang } from '~/composables/use-enable-multi-lang'

const LanguageService = {
  getLanguage () {
    return useCookie(LANG_KEY).value
  },

  setLanguage (language: string): void {
    const cookie = useCookie(LANG_KEY)
    const nuxtApp = useNuxtApp()
    nuxtApp.$i18n.setLocale(language)
    const store = appStore()
    store.setCurrentLang(language)
    let locale
    switch (language) {
      case 'en':
        locale = enLocale
        break
      case 'vi':
        locale = viLocale
        break
      case 'ch':
        locale = zhCn
        break
      default:
        locale = enLocale
        break
    }
    store.setConfigProvider(locale)
    cookie.value = language
  },

  initLanguage () {
    const config = useRuntimeConfig()
    const defaultLang = config.public.defaultLang
    if (!useEnableMultiLang()) {
      this.setLanguage(defaultLang)
      return
    }
    let initLang = this.getLanguage()
    if (!initLang) {
      initLang = config.public.defaultLang
    }
    this.setLanguage(initLang)
  },

  trans (key: string, options?: any) {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$i18n.t(key, options)
  }
}

export default LanguageService
