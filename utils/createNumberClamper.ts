export const createNumberClamper = (props: [number, number]) => {
  return (value: number) => {
    if (value < props[0]) return props[0]
    if (value > props[1]) return props[1]
    return value
  }
}
