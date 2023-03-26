

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { test } = req.body;

    try {
        console.log(test)
        res.status(201).json({status: "ok"})
    
    } catch (err) {
        throw new Error("Did not manage to connect")
    }
}