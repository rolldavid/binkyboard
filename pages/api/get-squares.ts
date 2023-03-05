
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const squareCollection = await prisma.square.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  res.status(200).json({ squares: squareCollection })
}
