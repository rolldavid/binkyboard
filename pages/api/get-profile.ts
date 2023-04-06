import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
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

        const session = await getSession(req, res)
        const accountOwner = session?.user?.email === user?.email ? true : false
        
        if (user) {

            if (!accountOwner) {
                res.status(201).json({
                    accountOwner: false
            })} else {
                res.status(201).json({
                    displayName: user.name,
                    accountOwner: true,
                    ownedBoards: user.ownedBoards
                }) 
            }
        } else {
            res.status(401).json({status: "unauthorized"})
        }
}