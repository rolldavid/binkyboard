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
            const upsertUser = await prisma.user.upsert({
                where: {
                  email: session.user.email,
                },
                update: {},
                create: {
                  email: session.user.email,
                  name: session.user.nickname,
                },
              })
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}