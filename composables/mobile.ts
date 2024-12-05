export function useMobile() {
  const result = ref(+window.innerWidth < 640)

  function handleResize() {
    result.value = +window.innerWidth < 640
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  return result
}
