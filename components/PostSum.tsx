import { PostOrPage } from "@tryghost/content-api"
import { DateTime } from "luxon"
import Image from "next/image"

export const PostSummary = (post: PostOrPage) => {
 return (
  <div key={post.id}>
   {post.feature_image ? (
    <a className="rounded overflow-hidden aspect-video w-full" href={post.url}>
     <div className="hover:brightness-125">
      <Image
       width={320}
       height={320 / (16 / 9)}
       src={post.feature_image}
       objectFit="cover"
      />
     </div>
    </a>
   ) : null}
   <div className="">
    <div className="text-xs mt-4 text-slate-500 font-medium">
     Published on{" "}
     <span className="text-slate-900">
      {DateTime.fromISO(post.published_at || "").toFormat("MMMM dd, yyyy")}
     </span>{" "}
     by{" "}
     <span className="text-slate-900">{post.authors?.[0] || "Airshyre"}</span>
    </div>
    <div className="text-3xl mt-8 font-regular">{post.title}</div>
    <div className="mt-4 text-slate-500 font-medium">
     {post.meta_description}
    </div>
    <div className="mt-4 text-slate-500 font-medium">{post.featured}</div>
    <div className="mt-4 text-slate-500 font-medium">
     <div dangerouslySetInnerHTML={{ __html: post.html || "" }} />
    </div>
   </div>
  </div>
 )
}

export const getStaticPaths = () => {
 return <div></div>
}
