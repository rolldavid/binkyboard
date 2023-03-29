

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { user } = req.body;

    if (user) {
        console.log("adding user....", "email: ", user.email, "nickname: ", user.nickname, "user :", user)
    

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
       
        res.status(201).json({status: "ok"})
        return
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}
res.status(201).json({status: "ok"})
}