import { NextApiRequest, NextApiResponse } from "next";
/* import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"; */
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { url, boardId } = req.body;
        
        const board = await prisma.board.update({
            where: {
                id: boardId
            },
            data: {
                headerURL: url,
                customHeader: true
            }
          })

        res.status(201).json({status: "ok"})
}