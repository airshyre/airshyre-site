import { PostOrPage } from "@tryghost/content-api"
import { DateTime } from "luxon"
import Image from "next/image"
import { ImPlay } from "react-icons/im"

export const PostFeatured = (post: PostOrPage) => {
 const imageWidth = 720
 return (
  <div className="group " key={post.id}>
   {post.feature_image ? (
    <a
     className="relative rounded overflow-hidden w-full aspect-video"
     href={`/posts/${post.id}`}
    >
     <div className="transition relative rounded overflow-hidden aspect-video shadow-sky-600 shadow-2xl rounded-xl">
      <div className="absolute w-full h-full flex items-center justify-center top-0 bottom-0 left-0 right-0">
       <div className="flex items-center justify-center h-30 w-32 rounded font-semibold font-medium flex items-center flex-center whitespace-nowrap px-6 py-1 text-center uppercase tracking-widest z-10 text-white rounded-md">
        {/* <p>OUT NOW</p> */}
        <div>
         <ImPlay className="transition w-24 h-24 text-white group-hover:text-gray-200" />
        </div>
       </div>
      </div>
      <Image
       width={imageWidth}
       height={imageWidth / (16 / 9)}
       src={post.feature_image}
       objectFit="cover"
       className="rounded overflow-hidden"
       alt="Featured image."
      />
     </div>
    </a>
   ) : null}
   <div>
    {/* <a href={`/posts/${post.id}`}>
     <div className="transition text-2xl mt-2 font-semibold group-hover:text-blue-600 group-hover:cursor-pointer group-hover:underline active:text-blue-800">
      {post.title}
     </div>
    </a> */}
    {/* <div className="mt-4 text-gray-500 font-medium">{post.custom_excerpt}</div> */}
    {/* <div className="text-xs mt-4 text-gray-500 font-medium">
     Released on{" "}
     <span className="text-gray-900">
      {DateTime.fromISO(post.published_at || "").toFormat("MMMM dd, yyyy")}
     </span>{" "}
     by <span className="text-gray-900">{post.authors?.[0] || "Airshyre"}</span>
    </div> */}
   </div>
  </div>
 )
}
