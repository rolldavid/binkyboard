import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { boardId, headerUrl, boardName, registryLink, accessStatus, accessList } = req.body;
        
        const board = await prisma.board.update({
            where: {
                id: boardId
            },
            data: {
                name: boardName,
                headerUrl: headerUrl,
                registry: registryLink,
                public: accessStatus,
                allowList: accessList.length > 0 ? accessList : ""
            }
            })

        res.status(201).json({status: "ok"})
        
        
}