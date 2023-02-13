
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { square } = req.body;

  if (square) {
    const add = await prisma.square.create({
        data: {
            note: square.note,
            author: square.author
        }
      })
  }

  res.status(200).json({ status: "ok" })
}
