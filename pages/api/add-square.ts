
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { note } = req.body;
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(201).json({session: false, userId: undefined})
  }

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
    })

    if (user){
      if (note && user.displayName) {
        if (typeof note === "string") {
          await prisma.square.create({
            data: {
                note,
                author: user.displayName
            }
          })
        }
      }
    }
  }
  

  res.status(200).json({ status: "ok" })
}
