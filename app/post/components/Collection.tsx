"use client"

import { getPosts } from "@/lib/db-utils"
import type { Post } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import PostItem from "./PostItem"
import styles from "./Collection.module.css"
import Spinner from "@/lib/Spinner"


export default function Collection({boardId}: {boardId: string}) {
 
    const { data, status } = useQuery(["postData"], () => {
        return getPosts(boardId)
      });

    
    if (status === "loading") {
        <Spinner />
    }

    if (status === "success" && data.posts) {
        return (
               
                <div className={styles.container}>
                    {
                        data.posts.map((post: Post, index: number) => {
                            return (
                                <PostItem key={index} post={post} slugs={post.slugs} />
                            )
                        })
                    }
                </div>
               
        )}

    return (
        <div>Hey</div>
    )
}


// <ReactPlayer url="https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock" controls={true} width="100%"/>