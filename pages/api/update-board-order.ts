import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { boardId } = req.body;

        const session = await getSession(req, res)

        if (session?.user.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                select: {
                    boardOrder: true,
                    id: true
                }
            })

            if (user) {
                const filteredBoards = user.boardOrder.filter(board => board !== boardId)
                
                filteredBoards.unshift(boardId)
                
                const updatedBoard = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        boardOrder: filteredBoards
                    }
                })
                res.status(201).json({status: "ok"})
            } else {
                res.status(404).json({status: "not found"})
            }
        } else {

            res.status(401).json({status: "unauthorized"})
        }
}