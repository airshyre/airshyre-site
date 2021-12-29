import GhostContentAPI from "@tryghost/content-api"

export const ghostClient = new GhostContentAPI({
 url: process.env.GHOST_API_URL || "",
 key: process.env.GHOST_API_CONTENT_KEY || "",
 version: "v3",
})
