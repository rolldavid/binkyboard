import type { Post } from "@prisma/client"

export interface PostItems {
    post: Post,
    displayName: string,
    isOwner: boolean
  }