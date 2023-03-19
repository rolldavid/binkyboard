import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { userId } = req.body;
        
        const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            ownedBoards: true
        }
        })

        const session = await getServerSession(req, res, authOptions)
        const accountOwner = session?.user?.email === user?.email ? true : false
        
        if (user) {

            if (!accountOwner) {
                res.status(201).json({
                    accountOwner: false
            })} else {
                res.status(201).json({
                    displayName: user.displayName,
                    accountOwner: true,
                    ownedBoards: user.ownedBoards
                }) 
            }
        }
}