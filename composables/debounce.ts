let timeOut: null | ReturnType<typeof setTimeout> = null
const timerDefault = ref(500)

export function useDebounce(cb: any, timer = timerDefault.value) {
  if (timeOut) clearTimeout(timeOut)
  timeOut = setTimeout(async () => {
    await cb()
  }, timer) // timer = 1s
}
