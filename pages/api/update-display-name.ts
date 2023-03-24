import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { displayName } = req.body;
    try {
        const session = await getSession(req, res)

        if (session?.user.email) {
            await prisma.user.update({
                where: {
                    email: session.user.email
                },
                data: {
                    name: displayName
                }
            })

            res.status(201).json({status: "ok"})
            return
        } else {
            res.status(401).json({message: "Not authorized"})
            return
        }
    } catch {
        throw new Error("Did not manage to connect")
    }
}