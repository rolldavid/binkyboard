import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardName, access, registry } = req.body;

    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(201).json({status: "failed"})
        }
        console.log("got session............", session.user)
        if (session?.user?.email) {

            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                }
            })

            if (user) {
                console.log("attempting to create board............", user.id)
                console.log("board name", boardName)
                console.log("access...........:::::", access)
                const board = await prisma.board.create({
                    data: {
                        name: boardName,
                        owner: {
                            connect: {
                                id: user.id
                            }
                        },
                        public: access,
                        users: {
                            connect: {
                                id: user.id
                            }
                        },
                        registry: registry
                    },
                })

                console.log("created...................")
                res.status(201).json({status: "ok", link: board.id})
                return;
            }

            res.status(201).json({status: "failed"})
            return;
            
            
        } else {
            res.status(401).json({status: "failed", link: "none"})
            return;
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
        return;
    }

}