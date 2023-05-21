import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const startTime = Date.now()

    try {
        const session = await getSession(req, res)
        if (!session) {
            const endTime = Date.now()
            console.log(`get user ID execution time: ${endTime - startTime} ms`)
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
                const endTime = Date.now()
                console.log(`get user ID execution time: ${endTime - startTime} ms`)
                return res.status(201).json({userId: dbUser?.id, role: dbUser?.role})
               
            } 

            return res.status(201).json({status: "Did not manage to connect"})
            

        }
        res.status(201).json({status: "Did not manage to connect"})

    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}