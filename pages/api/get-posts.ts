
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
          
        }
      })

     
      if (board && user !== null) {
        console.log("slugs:::::", board.posts[0].slugs)

        const posts = board.posts.map((post, index) => {
          const slugs = post.slugs.map((slug, index) => {
            const isImage = slug.slice(slug.indexOf(".")).includes("mp4") || slug.slice(slug.indexOf(".")).includes("mov") || slug.slice(slug.indexOf(".")).includes("MOV") ? false : true;
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
        res.status(200).json({ posts })
        return
      }

    
      throw new Error("Did not manage to connect")

    } catch {
      throw new Error("Did not manage to connect")
    }
}
