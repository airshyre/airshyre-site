import { PostOrPage } from "@tryghost/content-api"

export const PostContent = (post: PostOrPage) => {
 return (
  <div
   className="font-chivo mt-4 prose"
   dangerouslySetInnerHTML={{ __html: post.html || "" }}
  />
 )
}
