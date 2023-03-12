
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { boardId } = req.body;
  const board = await prisma.board.findUnique({
    where: {
        id: boardId
    },
    include: {
        posts: {
            orderBy: {
                createdAt: "desc"
            }
        }
    }
   
  })

  res.status(200).json({ board, posts: board?.posts })
}
