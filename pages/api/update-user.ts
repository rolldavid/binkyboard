import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const session = await getSession(req, res)
        console.log(session, "session))))))))))))))))")
        if (!session) {
            return res.status(201).json({session: false, userId: undefined})
        }

        if (session?.user?.email) {
            const upsertUser = await prisma.user.upsert({
                where: {
                  email: session.user.email,
                },
                update: {
                  email: session.user.email,
                  name: session.user.nickname,
                },
                create: {
                  email: session.user.email,
                  name: session.user.nickname,
                },
              })
        }

        res.status(201).json({status: "ok"})
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}