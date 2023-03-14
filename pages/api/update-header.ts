import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { url, boardId } = req.body;
        

        if (typeof url === "string") {
            const board = await prisma.board.update({
                where: {
                    id: boardId
                },
                data: {
                    headerURL: url,
                    customHeader: {
                        set: true
                    }
                }
              })
    
            res.status(201).json({status: "ok"})
        }
        
}