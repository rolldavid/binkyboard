import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(201).json({session: false, userId: undefined})
        }
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                include: {
                    accounts: {
                        select: {
                            provider: true
                        }
                    },
                    boards: true
                }
            })


            if (user) {

                const userProvider = user.accounts[0].provider

                if (!user.displayName) {

                    if (userProvider === "google") {
                        console.log('logged in with google')
                        const splitName = user.name?.split(" ")
                        if (splitName) {
                            const firstNameRaw = splitName[0]
                            let firstName = ""

                            for (let i = 0; i < firstNameRaw.length; i++) {
                                if (i === 0) {
                                    firstName = firstNameRaw[i].toUpperCase()
                                } else {
                                    firstName += firstNameRaw[i]
                                }
                            }
                            

                            const lastName = splitName[1].slice(0, 1).toUpperCase()

                            await prisma.user.update({
                                where: { id: user.id},
                                data: {
                                    displayName: `${firstName} ${lastName}`
                                }
                            })
                        }
                
                    } else {
                        console.log('logged in with email')
                        await prisma.user.update({
                            where: { id: user.id},
                            data: {
                                displayName: "blah"

                            }
                        })
                    }
                } 
                res.status(201).json({
                    session: true, 
                    userId: user.id, 
                    role: user.role, 
                    displayName: user.displayName,
                    boards: user.boards
                 })
            }
            
        } else {
            res.status(401).json({session: false, userId: "nope"})
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}