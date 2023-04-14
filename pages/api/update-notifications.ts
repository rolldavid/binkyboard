import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const session = await getSession(req, res)
        
        if (session?.user?.email) {

            const user = await prisma.user.findUnique({
                where: {email: session.user.email},
                include: {
                    notificationsActive: {
                        select: {
                            id: true,
                            notification: true,
                            board: {
                                select: {
                                    id: true
                                }
                            }, 
                        }, 
                        
                    },                        
                }
                
            })

            const mappedActive = user?.notificationsActive.map(activeNotification => {
                return {
                    id: activeNotification.id
                }
            })

            const mappedConnect = user?.notificationsActive.map(activeNotification => {
                return {
                    where: {
                        id: activeNotification.id
                    },
                    create: {
                        id: activeNotification.id,
                        notification: {
                            connect: {
                                id: activeNotification.notification.id
                            }
                        }, 
                        board: {
                            connect: {
                                id: activeNotification.board?.id
                            }
                        }
                    }
                }
            })


            if (mappedActive && mappedConnect) {
                const updateUser = await prisma.user.update({
                    where: {email: session.user.email},
                    data: {
                        notificationsActive: {
                            disconnect: mappedActive
                        },
                        notificationsComplete: {
                            connectOrCreate: mappedConnect
                        }
                    }
                })
            }
            
            res.status(201).json({message: "success"})


        } else {
            res.status(201).json({message: "Did not find user"})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}