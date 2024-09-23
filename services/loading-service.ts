import appStore from '~/store/app'

const LoadingService = {
  startLoading() {
    const store = appStore()
    store.setLoading(true)
  },
  stopLoading() {
    const store = appStore()
    store.setLoading(false)
  },
}
export default LoadingService
