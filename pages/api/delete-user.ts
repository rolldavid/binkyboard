import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession(req, res)
        if (!session) {
            res.status(401)
            return
        }

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({where: {email: session.user.email}, include: {ownedBoards: true}})

            await prisma.user.delete({where: {email: session.user.email}})
           
            res.status(201).json({status: "ok"})
            return
        }

    } catch {
        throw new Error("Did not manage to connect")
    }
}