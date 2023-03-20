
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log("fetching..........")
    try {
        const boards = await prisma.board.findMany()

        console.log(boards, "++++++++++++++++++++++")
        const mappedUrls = boards.map((board, index) => {
            return board.id
        })
        
        if (mappedUrls) {
            res.status(201).json({boards: mappedUrls})
            return
        }

        res.status(201).json({boards: []})
        
        

    } catch {
        throw new Error("Did not manage to connect")
    }
}
