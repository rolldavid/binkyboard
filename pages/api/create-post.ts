
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardId, note, slugs } = req.body;

    try {
        const session = await getSession(req, res)

        if (session?.user?.email) {

            const user = await prisma.user.findUnique({where: {email: session.user.email}})

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
                },
                include: {posts: true}
            })

            if (board && user && user.name && board.posts.length >= 1) {
             
                const boardFollowers = board.posts.filter(post => post.userId !== user.id)

                const receivers = boardFollowers.map(post => {
                    return {
                        id: post.userId
                    }
                })

                if (receivers.length > 0) {
                const notification = await prisma.notificationActive.create({
                    data: {
                        receivers: {
                            connect: 
                                receivers
                        },
                        notification: {
                            connect: {
                                id: 1,
                            }
                        },
                        board: {
                            connect: {
                                id: boardId
                            }
                        }, 
                        sender: user.name
                       
                    }
                })
                
                }
            }
        }

        res.status(201).json({status: "ok"})


    } catch {
        throw new Error("Did not manage to connect")
    }
}
