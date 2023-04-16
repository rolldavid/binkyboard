import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        const session = await getSession(req,res)
        
        if (session?.user?.email) {

            const user = await prisma.user.findUnique({
                where: {email: session.user.email},
                include: {
                    notificationsActive: {
                        select: {
                            createdAt: true,
                            notification: true,
                            sender: true,
                            board: true
                        },
                        orderBy: {
                            createdAt: "desc"
                        } 
                    },
                    notificationsComplete: {
                        take: 10,
                        select: {
                            createdAt: true,
                            notification: true,
                            sender: true,
                            board: true
                        },
                        orderBy: {
                            createdAt: "desc"
                        } 
                        
                    }
                }
            })

            const mappedActive = user?.notificationsActive.map(activeNotification => {
                return {
                    notification: activeNotification.notification.message,
                    notificationId: activeNotification.notification.id,
                    name: activeNotification?.board?.name ? activeNotification.board.name : false,
                    sender: activeNotification.sender,
                    slug: activeNotification.board?.id ? activeNotification.board.id : false,
                    createdAt: activeNotification.notification.createdAt
                }
            })

            const mappedComplete = user?.notificationsComplete.map(completeNotification => {
                return {
                    notification: completeNotification.notification.message,
                    notificationId: completeNotification.notification.id,
                    name: completeNotification.board?.name ? completeNotification.board.name : false,
                    slug: completeNotification.board?.id ? completeNotification.board.id : false,
                    sender: completeNotification.sender,
                    createdAt: completeNotification.notification.createdAt,
                }
            })

            if (mappedActive && mappedActive.length > 0) {
                if (mappedComplete && mappedComplete.length > 0) {
                    res.status(201).json({activeNotifications: mappedActive, completeNotifications: mappedComplete, loggedIn: true})
                } else {
                    res.status(201).json({activeNotifications: mappedActive, completeNotifications: [], loggedIn: true})
                }
              
            } else { 
                if (mappedComplete && mappedComplete.length > 0) {
                    res.status(201).json({activeNotifications: [], completeNotifications: mappedComplete, loggedIn: true})
                } else { 
                    res.status(201).json({activeNotifications: [], completeNotifications: [], loggedIn: true})
                } 
            } 

        } else {
            res.status(201).json({loggedIn: false})
        }
        
    } catch (err) {
        res.status(401).json({message: "Did not manage to connect"})
    }
}