

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { user } = req.body;
    console.log("adding user....")

    try {
        const upsertUser = await prisma.user.upsert({
            where: {
              email: user.email,
            },
            update: {
            },
            create: {
              email: user.email,
              name: user.nickname,
            },
          })
        console.log("done adding user....")
        res.status(201).json({status: "ok"})
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}