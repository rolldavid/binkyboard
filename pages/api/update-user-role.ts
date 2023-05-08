import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { userId, role } = req.body;

    try {
        const session = await getSession(req, res)
        if (!session) {
            return res.status(201).json({session: false, userId: undefined})
        }

        if (session?.user?.email) {

            const checkAdmin = await prisma.user.findUnique({ where: {email: session.user.email}})
            
            if (checkAdmin && checkAdmin.role === "ADMIN" && typeof userId === "string") {
                
                const user = await prisma.user.update({
                    where: {
                      id: userId
                    },
                    data: {
                        role
                    }
                  })
            }
        }

        res.status(201).json({status: "ok"})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}