import { ComponentProps } from "react"

export const ExternalLink = ({ children, ...props }: ComponentProps<"a">) => {
  return (
    <a rel="noopen noreferrer" target="_blank" tabIndex={0} {...props}>
      {children}
    </a>
  )
}
