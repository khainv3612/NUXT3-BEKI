import { defineStore } from 'pinia'
import enLocale from 'element-plus/dist/locale/en.mjs'

const appStore = defineStore('appStore', {
  state: () => ({
    loading: false,
    notification: {
      show: false,
      type: '',
      title: '',
      message: ''
    },
    currentLang: useRuntimeConfig().public.DEFAULT_LANG,
    chainId: null,
    chain: {},
    configProvider: enLocale
  }),
  getters: {
    getLoading: state => state.loading,
    getNotification: state => state.notification
  },
  actions: {
    setLoading (data: boolean) {
      this.loading = data
    },
    setCurrentLang (currentLang: String) {
      this.currentLang = currentLang
    },
    setConfigProvider (configProvider: any) {
      this.configProvider = configProvider
    }
  }
})
export default appStore
