import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { star, boardId } = req.body;
        
        const session = await getServerSession(req, res, authOptions)
        
        if (session && session.user?.email && star) {
            const user = await prisma.user.update({
                where: {
                    email: session?.user?.email
                },
                data: {
                    boards: {
                        connect: {
                            id: boardId
                        }
                    }
                }
                })
            res.status(201).json({status: "added"})
            return
        } else if (session && session.user?.email && !star) {
            const user = await prisma.user.update({
                where: {
                    email: session?.user?.email
                },
                data: {
                    boards: {
                        disconnect: {
                            id: boardId
                        }
                    }
                }
                })
            res.status(201).json({status: "removed"})
            return
        }


        res.status(401).json({status: "null"})
}