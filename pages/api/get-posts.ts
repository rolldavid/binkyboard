
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { boardId } = req.body;

    try {
      
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

      if (board) {

        const posts = board.posts.map((post, index) => {
          return {
            post,
            displayName: board.posts[index].user.name,
            isOwner: true
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
