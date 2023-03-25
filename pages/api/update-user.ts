import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("update...........")
    try {
        const session = await getSession(req, res)
        if (!session) {
            return res.status(201).json({session: false, userId: undefined})
        }

        console.log(session.user, "=======================")

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