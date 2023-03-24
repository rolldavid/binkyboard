import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        const session = await getSession(req, res)

        if (session?.user) {
            res.status(201).json({session: true})
        } else {
            res.status(201).json({session: false})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}