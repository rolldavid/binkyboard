
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { note, mediaDetails,  } = req.body;
  const userSession = await getSession(req, res)

  if (!userSession) {
    return res.status(201).json({session: false, userId: undefined})
  }

  if (userSession) {
    const user = await prisma.user.findUnique({
        where: {
            email: userSession.user.email
        },
    })
  }
    /* if (user){
      if (note && user.displayName) {
        if (typeof note === "string") {
          await prisma.post.create({
            data: {
                note,
              
            }
          })
        }
      }
    }
  } */
  

  res.status(200).json({ status: "ok" })
}
