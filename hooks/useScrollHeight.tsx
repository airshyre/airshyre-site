import React, { useRef } from "react"

export const useScrollHeight = (scrollHeight: number) => {
 // const [scrollHeight, setScrollHeight] = React.useState(window.scrollY);
 const [isAtScrollHeight, setIsAtScrollHeight] = React.useState(false)
 React.useEffect(() => {
  const updateView = () => {
   if (window.scrollY >= scrollHeight) {
    setIsAtScrollHeight(true)
   } else {
    setIsAtScrollHeight(false)
   }
  }
  window.addEventListener("scroll", updateView)
  return () => {
   window.removeEventListener("scroll", updateView)
  }
 }, [])
 return { isAtScrollHeight }
}
