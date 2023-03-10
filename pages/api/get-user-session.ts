import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";


const names = ["Cow", "Dog", "Chicken", "Cat", "Piggy", "Duck", "Giraffe", "Bear", "Snake", "Grasshopper", "Daffodil", "Bones", "Rose", "Iris", "Ghost", "Cactus"]
const adj = ["Silly", "Happy", "Mad", "Brave", "Bright", "Wise", "Cranky", "Kind", "Super", "Funny", "Wild", "Power"]
const randomName = names[Math.floor(Math.random() * names.length)]; 
const randomAdj = adj[Math.floor(Math.random() * adj.length)]; 
const randomNum = Math.floor(Math.random() * 1000) 
const displayName = randomAdj + randomName + randomNum

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
            })

            if (user) {
                if (!user.displayName) {
                    await prisma.user.update({
                        where: { id: user.id},
                        data: {
                            displayName,

                        }
                    })
                } 
                res.status(201).json({session: true, userId: user.id })
            }
            
        } else {
            res.status(401).json({session: false, userId: "nope"})
        }
    } catch (err) {
        throw new Error("Did not manage to connect")
    }

}