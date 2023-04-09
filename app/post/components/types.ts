import type { Post } from "@prisma/client"

export interface PostItems {
    post: Post,
    slugs: {
      slug: string
      type: string
    }[],
    socialUrl: string
    displayName: string
    isOwner: boolean
    isAdmin: boolean
  }

  export interface GalleryItems {
    slug: string
    type: string
  }

