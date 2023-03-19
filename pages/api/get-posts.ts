
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { boardId } = req.body;

    try {

      const session = await getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401)
            return
        }

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
                  displayName: true
                }
              }
            }
          },
          owner: {
            select: {
              email: true
            }
          }
        }
      })


      if (board && session.user?.email) {
        const posts = board.posts.map((post, index) => {
          return {
            post,
            displayName: board.posts[index].user.displayName
          }
        })

        res.status(200).json({ posts, isOwner: session.user.email === board.owner.email ? true : false })
        return
      }

      res.status(404).json({status: "nope"})

    } catch {
      throw new Error("Did not manage to connect")
    }

}
