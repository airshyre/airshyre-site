import React, { useRef } from "react"

export const useScrollHeight = () => {
 const [scrollHeight, setScrollHeight] = React.useState<number>(0)
 React.useEffect(() => {
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
