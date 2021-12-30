import React, { useRef } from "react"

export const useIsInView = () => {
 const ref = useRef<any>(null)
 const [isInView, setIsInView] = React.useState(false)

 React.useEffect(() => {
  const observer = new IntersectionObserver(([entry]) =>
   setIsInView(entry.isIntersecting)
  )
  observer.observe(ref.current)
  return () => {
   observer.disconnect()
  }
 }, [])

 return { ref, isInView }
}
