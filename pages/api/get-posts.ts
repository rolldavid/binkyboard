
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  res.status(200).json({ posts: posts })
}
