"use client"

import { useState, useEffect } from "react"
import { getPosts } from "@/lib/db-utils"
import { Post } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import ReactPlayer from "react-player"
import PostItem from "./Post"
import styles from "./Collection.module.css"
import Spinner from "@/lib/Spinner"
import ScrollToTop from "@/lib/ScrollToTop"

export default function Collection({boardId}: {boardId: string}) {
   

    const { data, status } = useQuery(["postData"], () => {
        return getPosts(boardId)
      });

    
    if (status === "loading") {
        <Spinner />
    }

    if (status === "success" && data) {
    return (
        <>
            <div className={styles.container}>
                {
                    data.posts.map((post: Post, index: number) => {
                        return (
                            <PostItem key={index} post={post} slugs={post.slugs} />
                        )
                    })
                }
                        <ReactPlayer url="https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock" controls={true} width="100%"/>

            </div>
        </>
    )}

    return null;
}