const postmark = require("postmark")
import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardId } = req.body;
   // Send an email:
    const client = new postmark.ServerClient("607e28b2-5012-4f2f-b80c-dc551ce39a1a");

    try {
        const session = await getSession(req, res)
        if (!session) {
            return res.status(201).json({session: false})
        }

        if (session?.user?.email) {

            const user = await prisma.user.findUnique({where: {email: session.user.email}})
            const board = await prisma.board.findUnique({where: {id: boardId}})

            if (user && board) {
            const owner = await prisma.user.findUnique({where: {id: board.ownerId}})

                if (owner) {
                client.sendEmail({
                    "From": `${process.env.EMAIL_FROM}`,
                    "To": `${owner.email}`,
                    "Subject": `${user.name} requested access to ${board.name}`,
                    "HtmlBody": `<html><body>Hi ${owner.name},<br><br>${user.name} has requested access to your board, ${board.name}.<br><br><strong>To grant access:</strong><br>1) Go to <a href=${process.env.NEXT_PUBLIC_FRONTEND_URL}/board/${boardId}>your board</a><br>2) Click the gear icon in header<br>3) Add ${user.email} to the access list.<br></body></html>`,
                    "TextBody": "Hello from Postmark!",
                    "MessageStream": "request-access"
                    });
            
                res.status(201).json({status: "ok"})
                }
            }
            
        } 
    } catch {
        throw new Error("Did not manage to connect")
    }
}