
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardId, note, slugs } = req.body;

    try {
        const session = await getServerSession(req, res, authOptions)


        if (session?.user?.email) {

            const board = await prisma.board.update({
                where: {
                    id: boardId
                },
                data: {
                    posts: {
                        create: {
                            user: {
                                connect: {
                                    email: session.user.email
                                }
                            },
                            note,
                            slugs: slugs.map((c: string) => (c)) || [],
                            
                        }
                    }
                }
            })
        }

        res.status(201).json({status: "ok"})


    } catch {
        throw new Error("Did not manage to connect")
    }
}
