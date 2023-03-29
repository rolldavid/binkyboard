import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardId, postId } = req.body;

    try {
        const session = await getSession(req, res)

        if (!session) {
            res.status(401)
            return
        }

        if (session?.user?.email) {
            const board = await prisma.board.findUnique({where: {id: boardId}, include: {owner: {select: {email: true}} }})
            const post = await prisma.post.findUnique({where: {id: postId}, include: { user: { select: {email: true}} }})

            if (board && post && board.owner.email === session.user.email || post?.user.email === session.user.email) {
               
                const deletedPost = await prisma.post.delete({
                    where: {
                        id: postId
                    }
                })

                res.status(201).json({status: "ok"})
                return
            }
    
        }
        res.status(401).json({status: "not authorized"})
            
    } catch {
        throw new Error("Did not manage to connect")
    }
}