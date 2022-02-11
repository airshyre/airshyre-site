export const createNumberRangeTransform = (
  inputDomain: [number, number],
  outputDomain: [number, number]
) => {
  return (value: number) => {
    return (
      ((value - inputDomain[0]) / (inputDomain[1] - inputDomain[0])) *
        (outputDomain[1] - outputDomain[0]) +
      outputDomain[0]
    )
  }
}
