import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    try {
        const session = await getSession(req, res)
        if (!session) {
            res.status(201).json({session: false, userId: undefined})
            return
        }

        if (session?.user?.email) {
            const userBoards = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                include: {
                   boards: true
                }
            })


    
                
        
            if (userBoards) {    
                res.status(201).json({boards: userBoards?.boards, role: userBoards?.role})
                return
            }

            res.status(201).json({status: "Did not manage to connect"})
            return
            
        } 

        res.status(201).json({status: "Did not manage to connect"})
                       
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}