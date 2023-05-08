import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { message, description } = req.body

    try {
        const session = await getSession(req, res)

        if (!session) {
            return res.status(201).json({session: false, user: undefined})
        }

        if (session?.user?.email) {
           
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                }
            })

            if (user && user.role === "ADMIN") {
                
                await prisma.notification.create({
                    data: {
                        message,
                        description
                    }
                })
                res.status(201).json({status: "ok"})
                return
            }  else {
                res.status(201).json({status: "forbidden"})
                return
            }
            
        }
        res.status(201).json({user: undefined})

    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}