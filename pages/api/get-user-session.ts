import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(201).json({session: false, userId: undefined})
        }
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
            })

            if (user) {
                res.status(201).json({session: true, userId: user.id })
            }
            
        } else {
            res.status(401).json({session: false, userId: undefined})
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}