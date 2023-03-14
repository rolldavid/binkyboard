import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { displayName } = req.body;
    try {
        const session = await getServerSession(req, res, authOptions)

        if (session?.user?.email) {
            await prisma.user.update({
                where: {
                    email: session.user.email
                },
                data: {
                    displayName
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