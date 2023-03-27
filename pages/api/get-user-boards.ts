import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { invite } = req.body;

    console.log("invite...................", invite)

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

                let isConnected = 0
        
                for (let j = 0; j < userBoards.boards.length; j++) {
                    if (invite === userBoards.boards[j].id) {
                        isConnected += 1
                    }
                }
        
                if (isConnected === 0) {
                    await prisma.user.update({
                        where: {
                            email: session.user.email
                        },
                        data: {
                            boards: {
                                connect: {
                                    id: invite
                                }
                            }
                        }
                    })
                }
                

        
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