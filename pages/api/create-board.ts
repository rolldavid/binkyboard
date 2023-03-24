import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { boardName, access, registry, accessList } = req.body;

    console.log("lets try this")
    try {
        const session = await getSession(req, res)
        console.log("no session")
        if (!session) {
            return res.status(201).json({status: "failed"})
        }
    
        if (session?.user?.email) {

            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                }
            })

            if (user) {
                console.log("yes user!!!!")
                const board = await prisma.board.create({
                    data: {
                        name: boardName,
                        owner: {
                            connect: {
                                id: user.id
                            }
                        },
                        privacy: access,
                        allowList: accessList,
                        users: {
                            connect: {
                                id: user.id
                            }
                        },
                        registry: registry,
                        headerUrl: `yPwbiLyA-e_APVJ1vI6MS.png`
                    },
                })

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
      
    }

}