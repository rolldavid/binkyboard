import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        const session = await getServerSession(req, res, authOptions)

        if (session?.user) {
            res.status(201).json({session: true})
        } else {
            res.status(201).json({session: false})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}