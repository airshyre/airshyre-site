import { PostOrPage } from "@tryghost/content-api"
import React from "react"

export const PostContent = ({
 children = null,
 content,
}: {
 content: PostOrPage
 children?: React.ReactNode
}) => {
 return (
  <div className="font-chivo mt-4 prose">
   {children}
   <article dangerouslySetInnerHTML={{ __html: content.html || "" }} />
  </div>
 )
}
