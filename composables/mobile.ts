export function useMobile () {
  const isMobile = computed(() => {
    return window.innerWidth < 641
  })
  return isMobile.value
}
