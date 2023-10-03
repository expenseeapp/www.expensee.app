export const delay = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true)
    }, ms)
  })
}
