"use client"

import { useState, useEffect } from "react"
import { getPosts } from "@/lib/db-utils"
import { PostItems } from "./types"
import { useQuery } from "@tanstack/react-query"
import PostItem from "./PostItem"
import styles from "./Collection.module.css"
import Spinner from "@/lib/Spinner"


export default function Collection({boardId, isOwner}: {boardId: string, isOwner: boolean}) {

    const { data, status } = useQuery(["collection"], () => {
        return getPosts(boardId)
      });

    
    if (status === "loading") {
        <Spinner />
    }

    if (status === "success" && data.posts) {
        return (
               
                <div className={styles.container}>
                    {
                        data.posts.map((post: PostItems, index: number) => {
                
                            return (
                                <PostItem key={index} post={post} slugs={post.post.slugs} boardId={boardId}/>
                            )
                        })
                    }
                </div>
               
        )}

    return (
        <div>Hey there</div>
    )
}


// <ReactPlayer url="https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock" controls={true} width="100%"/>