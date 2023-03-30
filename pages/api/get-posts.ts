
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { boardId } = req.body;

    try {
      
      const session = await getSession(req,res)
      const user = await prisma.user.findUnique({where: {email: session?.user.email}})

      const board = await prisma.board.findUnique({
        where: {
          id: boardId
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc"
            },
            include: {
              user: {
                select: {
                  name: true
                }
              }
            }
          },
          pinnedPost: {
            include: {
              user: {
                select: {
                  name: true,
                  id: true,
                  role: true
                }
              }
            }
          }
            
        }
      })


      if (board && user) {
            const filteredPosts = board.posts.filter(post => board.pinnedPost ? board.pinnedPost.id !== post.id : post.id)
        
            const pinnedSlugs = board.pinnedPost ? 
              board.pinnedPost.slugs.map(slug => {
               
                const isImage = slug.slice(slug.lastIndexOf(".")).includes("mp4") || slug.slice(slug.lastIndexOf(".")).includes("mov") || slug.slice(slug.lastIndexOf(".")).includes("MOV") || slug.slice(slug.lastIndexOf(".")).includes("quicktime")? false : true;
                return {
                  slug: slug,
                  type: isImage ? "image" : "video"
                }
              })
            : false;

            const pinnedSocialUrl = board.pinnedPost ? board.pinnedPost.note.split(" ").filter(word => word.includes("youtube.com/") || word.includes("soundcloud.com/")) : false;

            const pinnedPost = board.pinnedPost ? {
              post: board.pinnedPost,
              slugs: pinnedSlugs,
              socialUrl: pinnedSocialUrl ? pinnedSocialUrl.length > 0 ? pinnedSocialUrl[0] : [] : [],
              displayName: board.pinnedPost.user.name,
              isOwner: board.ownerId === user.id ? true : false,
              isAdmin: board.pinnedPost.user.role === "ADMIN" || board.ownerId === board.pinnedPost.user.id
            }
            : false;
       
            const posts = filteredPosts.map((post, index) => {

              const slugs = post.slugs.map((slug, index) => {
                const isImage = slug.slice(slug.lastIndexOf(".")).includes("mp4") || slug.slice(slug.lastIndexOf(".")).includes("mov") || slug.slice(slug.lastIndexOf(".")).includes("MOV") ? false : true;
               
                return {
                  slug: slug,
                  type: isImage ? "image" : "video"
                }
              })

              const socialUrl = post.note.split(" ").filter(word => word.includes("youtube.com/") || word.includes("soundcloud.com/"))

              return {
                post,
                slugs,
                socialUrl: socialUrl.length > 0 ? socialUrl[0] : [],
                displayName: board.posts[index].user.name,
                isOwner: board.ownerId === user.id || user.role === "ADMIN" || post.userId === user.id ? true : false,
                isAdmin: user.role === "ADMIN" || board.ownerId === user.id
              }
            
          })

          res.status(200).json({ posts, pinned: pinnedPost })
          return;
          }
        

      res.status(401).json({status: "unauthorized"})

    } catch {
      throw new Error("Did not manage to connect")
    }
}
