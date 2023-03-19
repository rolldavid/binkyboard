import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
        const { userId } = req.body;

        try {
            const user = await prisma.user.findUnique({where: {id: userId}})
            res.status(201).json({user})
            return
        } catch {
            throw new Error("Did not manage to connect")
        }
}