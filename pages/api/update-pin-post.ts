import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { boardId, postId } = req.body;
        
        try {
            const session = await getSession(req, res)

            const ownerBoard = await prisma.board.findUnique({
                where: { id: boardId},
                include: {
                    owner: {
                        select: {
                            email: true
                        }
                    }
                }
            })


            if (session && ownerBoard && ownerBoard.owner.email === session.user.email) {


                const checkBoard = await prisma.board.findUnique({where: {id: boardId}, include: {pinnedPost: true}})

                if (checkBoard && checkBoard.pinnedPost) {
                    const removePin = await prisma.board.update({
                        where: {
                            id: boardId
                        },
                        data: {
                           pinnedPost: {
                            disconnect: true
                           }
                        }
                    })
                }
                
    
                res.status(201).json({status: "ok"})
                return
            }

            res.status(401).json({status: "unauthorized"})
            
        } catch {
            throw new Error("Did not manage to connect")
        }
}