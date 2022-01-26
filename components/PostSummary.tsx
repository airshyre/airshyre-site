import { PostOrPage } from "@tryghost/content-api"
import { DateTime } from "luxon"
import Image from "next/image"

export const PostSummary = (post: PostOrPage) => {
 return (
  <div className="group" key={post.id}>
   {post.feature_image ? (
    <a
     className="rounded overflow-hidden aspect-video w-full"
     href={`/posts/${post.id}`}
    >
     <div className="group-hover:brightness-125 transition active:brightness-150">
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
    <a href={`/posts/${post.id}`}>
     <div className="transition text-2xl mt-2 font-semibold group-hover:text-blue-600 group-hover:cursor-pointer group-hover:underline active:text-blue-800">
      {post.title}
     </div>
    </a>
    <div className="mt-4 text-gray-500 font-medium">{post.custom_excerpt}</div>
    <div className="text-xs mt-4 text-gray-500 font-medium">
     Released on{" "}
     <span className="text-gray-900">
      {DateTime.fromISO(post.published_at || "").toFormat("MMMM dd, yyyy")}
     </span>{" "}
     by <span className="text-gray-900">{post.authors?.[0] || "Airshyre"}</span>
    </div>
   </div>
  </div>
 )
}

export const getStaticPaths = () => {
 return <div></div>
}
