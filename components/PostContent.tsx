import { PostOrPage } from "@tryghost/content-api"

export const PostContent = (post: PostOrPage) => {
 return (
  <article
   className="font-chivo mt-4 prose"
   dangerouslySetInnerHTML={{ __html: post.html || "" }}
  />
 )
}
