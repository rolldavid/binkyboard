
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

        const posts = board.posts.map((post, index) => {
          return {
            post,
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
