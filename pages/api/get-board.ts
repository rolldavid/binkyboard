
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
    console.log("trying to find board............")
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
        }
    
    })

    console.log("found board, now find user..............")

    if (session?.user?.email) {

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user.email
            }, 
            include: {
                ownedBoards: true,
                boards: true
            }
        })

        console.log("found user, now do things............")

        let isOwner = false
    
        let isConnected = 0
        let privLevel = "ONE"

        if (user && board) {


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
        }

        console.log("did stuff......now go back")
        console.log("here's the board..........", board)

        if (board && board.privacy) {
            console.log(board, "board +++++++++++++")
            console.log(board.privacy, "board access")
            res.status(200).json({ board, posts: board.posts, isOwner, privacyLevel: "TWO" })
        return
        }
        throw new Error("not authorized")
    }
    } catch {
        throw new Error("Did not manage to connect")
    }
 
}
