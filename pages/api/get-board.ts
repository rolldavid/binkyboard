
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { boardId } = req.body;

  const session = await getServerSession(req, res, authOptions)

  const board = await prisma.board.findUnique({
    where: {
        id: boardId
    },
    include: {
        posts: {
            orderBy: {
                createdAt: "desc"
            }
        },
        users: true
    }
   
  })

  let isStarred = false

  if (session?.user?.email && board?.users) {
    for (let i = 0; i < board.users.length; i++) {
        if (board.users[i].email === session.user.email) {
            isStarred = true;
        }
    }
  }

  res.status(200).json({ board, posts: board?.posts, isStarred })
}
