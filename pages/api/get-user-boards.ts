import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const startTime = Date.now()

    try {
        const session = await getSession(req, res)
        if (!session) {
            console.log(`get boards execution time: ${Date.now() - startTime} ms`)
            return res.status(201).json({session: false, userId: undefined})
          
        }

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                include: {
                    boards: true,
                }
            })

            if (user) {    
                
                const orderedBoards = user.boards
                orderedBoards.sort(function (a,b) {
                    return user.boardOrder.indexOf(a.id) - user.boardOrder.indexOf(b.id)
                })
                
                console.log(`get boards execution time: ${Date.now() - startTime} ms`)
                return res.status(201).json({boards: orderedBoards, role: user.role})
              
            }

            console.log(`get boards execution time: ${Date.now() - startTime} ms`)
            return res.status(201).json({status: "Did not manage to connect"})
          
        } 

        console.log(`execution time: ${Date.now() - startTime} ms`)
        res.status(201).json({status: "Did not manage to connect"})
                       
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}