import { Square } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'

interface SquareRes {
  squares: Square[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SquareRes>
) {
  const squareCollection = await prisma.square.findMany()

  res.status(200).json({ squares: squareCollection })
}
