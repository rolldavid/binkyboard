

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { user, text } = req.body;
    console.log("doing it")
    console.log(user, "user:::", text, "text:::")

    try {
       
        
        console.log(user, "user..........")
        console.log("did it")
        res.status(201).json({status: "ok"})
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}