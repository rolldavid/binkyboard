import type { NextApiRequest, NextApiResponse } from "next";
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
                include: {
                   boards: true
                }
            })

            res.status(201).json({boards: user?.boards})
        } else {
            res.status(201).json({boards: undefined})
        }
                       
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}