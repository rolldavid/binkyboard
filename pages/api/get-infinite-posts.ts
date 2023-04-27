import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cursor } = req.query
  const { boardId } = req.body



  if (typeof cursor === "string") {
      const myCursor = parseInt(cursor)
     
        try {
            const session = await getSession(req,res)



            const newCursor = await prisma.board.findUnique(
                {
                    where: {
                    id: boardId
                },
                include: {
                    posts: {
                        orderBy: {
                            createdAt: "desc"
                        },
                        take: 1
                    },
                }
            })

         

        

            const user = await prisma.user.findUnique({where: {email: session?.user.email}})

           

            const initCursor = newCursor && newCursor.posts.length > 0 && myCursor === 1 ? newCursor.posts[0].id : myCursor
            

                const board = await prisma.board.findUnique({
                    where: {
                    id: boardId
                    },
                    include: {
                    posts: {
                        take: 11,
                        skip: myCursor === 1 ? 0 : 1,
                        cursor: {
                            id: initCursor
                        },
                        orderBy: {
                        createdAt: "desc"
                        },
                        include: {
                        user: {
                            select: {
                            name: true
                            }
                        }
                        }
                    },
                    pinnedPost: {
                        include: {
                        user: {
                            select: {
                    
                            id: true,
                    
                            }
                        }
                        }
                    }
                        
                    }
                })

               
            
                if (board && user) {
                    const filteredPosts = board.posts.filter(post => board.pinnedPost ? board.pinnedPost.id !== post.id : post.id)
            
                    const posts = filteredPosts.map((post, index) => {

                        const slugs = post.slugs.map((slug, index) => {
                            const isImage = slug.slice(slug.lastIndexOf(".")).includes("mp4") || slug.slice(slug.lastIndexOf(".")).includes("mov") || slug.slice(slug.lastIndexOf(".")).includes("MOV") ? false : true;
                            return {
                                slug: slug,
                                type: isImage ? "image" : "video"
                            }
                        })

                        const socialUrl = post.note.split(" ").filter(word => word.includes("youtube.com/") || word.includes("soundcloud.com/"))

                        return {
                            post,
                            slugs,
                            socialUrl: socialUrl.length > 0 ? socialUrl[0] : [],
                            displayName: filteredPosts[index].user.name,
                            isOwner: board.ownerId === user.id || user.role === "ADMIN" || post.userId === user.id ? true : false,
                            isAdmin: user.role === "ADMIN" || board.ownerId === user.id
                        }
                    })

                    const mappedPosts = posts.slice(0,10)
            
                    const returnCursor = mappedPosts.length === 10 ? 9 : mappedPosts.length === 9 ? 8 : mappedPosts.length === 8 ? 7 : mappedPosts.length === 7 ? 6 : mappedPosts.length === 6 ? 5 : posts.length === 5 ? 4 : posts.length === 4 ? 3 : posts.length === 3 ? 2 : posts.length === 2 ? 1 : posts.length === 1 ? 0 : undefined
                
                    res.status(200).json({ posts: mappedPosts, nextCursor: returnCursor ? posts[returnCursor].post.id : undefined})
                    return;
                
                }
        
      
    } catch (err) {
        throw new Error("Did not manage to connect");
      }
  }

}
