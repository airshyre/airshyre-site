import { PostOrPage } from "@tryghost/content-api"
import { DateTime } from "luxon"
import Image from "next/image"

export const PostSummary = (post: PostOrPage) => {
 return (
  <div key={post.id}>
   {post.feature_image ? (
    <a
     className="rounded overflow-hidden aspect-video w-full"
     href={`/posts/${post.id}`}
    >
     <div className="hover:brightness-125 transition active:brightness-150">
      <Image
       width={320}
       height={320 / (16 / 9)}
       src={post.feature_image}
       objectFit="cover"
      />
     </div>
    </a>
   ) : null}
   <div>
    <div className="text-xs mt-4 text-slate-500 font-medium">
     Released on{" "}
     <span className="text-slate-900">
      {DateTime.fromISO(post.published_at || "").toFormat("MMMM dd, yyyy")}
     </span>{" "}
     by{" "}
     <span className="text-slate-900">{post.authors?.[0] || "Airshyre"}</span>
    </div>
    <a href={`/posts/${post.id}`}>
     <div className="text-2xl mt-2 font-semibold hover:text-blue-600 hover:cursor-pointer hover:underline active:text-blue-800">
      {post.title}
     </div>
    </a>
    <div className="mt-4 text-slate-500 font-medium">{post.custom_excerpt}</div>
   </div>
  </div>
 )
}

export const getStaticPaths = () => {
 return <div></div>
}
