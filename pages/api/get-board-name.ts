
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const { boardId } = req.body;
    
    try {
        const board = await prisma.board.findUnique({where: {id: boardId}})
        if (board) {
            res.status(201).json({boardName: board.id})
        } else {
            res.status(201).json({boardName: "binkyboard"})
        }
    } catch {
        throw new Error("Did not manage to connect")
    }
}