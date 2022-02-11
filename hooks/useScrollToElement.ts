import React from "react"

export const useScroll = () => {
  const ref = React.useRef<any>(null)
  const scrollToElement = () => {
    ref?.current?.scrollIntoView?.({ behavior: "smooth" })
  }
  return { ref, scrollToElement }
}
