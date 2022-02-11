import React from "react"

export const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = React.useState<number>(0)
  React.useEffect(() => {
    if (window === undefined) return
    const updateView = () => {
      setScrollHeight(window.scrollY)
    }
    window.addEventListener("scroll", updateView)
    return () => {
      window.removeEventListener("scroll", updateView)
    }
  }, [])
  return scrollHeight
}
