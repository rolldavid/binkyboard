
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { note, author } = req.body;

  if (note && author) {
    const add = await prisma.square.create({
        data: {
            note,
            author
        }
      })
  }

  res.status(200).json({ status: "ok" })
}
