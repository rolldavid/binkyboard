import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const session = await getSession(req, res)
        if (!session) {
            return res.status(201).json({session: false, userId: undefined})
        }

        if (session?.user?.email) {
            const userEmail = session.user.email;
           
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: userEmail
                }
            })

            if (dbUser) {
                res.status(201).json({userId: dbUser?.id, role: dbUser?.role})
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