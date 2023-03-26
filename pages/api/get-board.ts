
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { boardId } = req.body;

  const session = await getSession(req, res)

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

        const boardUser = await prisma.user.findUnique({
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
      

        if (boardUser) {

            for (let i = 0; i < boardUser.ownedBoards.length; i++) {
                if (board.id === boardUser.ownedBoards[i].id) {
                isOwner = true
                }
            }

            for (let j = 0; j < boardUser.boards.length; j++) {
                if (board.id === boardUser.boards[j].id) {
                
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
