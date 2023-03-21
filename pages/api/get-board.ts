
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

  try {
  
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
            users: true,
            owner: true
        }
    
    })


    if (session?.user?.email && board) {

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user.email
            }, 
            include: {
                ownedBoards: true,
                boards: true
            }
        })


        let isOwner = false
        let isConnected = 0
      

        if (user) {

            for (let i = 0; i < user.ownedBoards.length; i++) {
                if (board.id === user.ownedBoards[i].id) {
                isOwner = true
                }
            }

            for (let j = 0; j < user.boards.length; j++) {
                if (board.id === user.boards[j].id) {
                
                    isConnected += 1
                }
            }

            if (isConnected === 0) {
            
                await prisma.user.update({
                    where: {
                        email: session.user.email
                    },
                    data: {
                        boards: {
                            connect: {
                                id: board.id
                            }
                        }
                    }
                })
            }
        
            const hasAccess = board.privacy === "TWO" ? board.allowList?.includes(session.user.email) ? true : false : true

            res.status(201).json({board, isOwner, hasAccess, session: true})
            

        } else {
            res.status(201).json({session: false, hasAccess: false})
        }
    } else {
        res.status(201).json({session: false, hasAccess: false})
    }

    } catch {
        throw new Error("Did not manage to connect")
    }
}
