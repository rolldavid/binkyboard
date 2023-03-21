import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardId } = req.body;
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401)
            return
        }

        if (session?.user?.email) {
            const user = await prisma.user.update({
                where: {
                    email: session.user.email
                },
                data: {
                    boards: {
                        disconnect: {
                            id: boardId
                        }
                    }
                }   
            })

            console.log("removed....")
            res.status(201).json({status: "ok"})
        }

    } catch {
        throw new Error("Did not manage to connect")
    }
}