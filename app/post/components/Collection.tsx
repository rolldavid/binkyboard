"use client"

import { useState, useEffect } from "react"
import { Post } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import ReactPlayer from "react-player"
import PostItem from "./Post"
import styles from "./Collection.module.css"
import Spinner from "@/lib/Spinner"

export default function Collection() {
   
    async function getPosts() {
        const res = await fetch("/api/get-posts")
        const data = await res.json()
        return data
    }

    const { data, status } = useQuery(["postData"], () => {
        return getPosts()
      });

    
    if (status === "loading") {
        <Spinner />
    }

    if (status === "success" && data.squares) {
    return (
        <div className={styles.container}>
            {
                data.posts.map((post: Post, index: number) => {
                    return (
                        <PostItem key={index} post={post}/>
                    )
                })
            }
                    <ReactPlayer url="https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock" controls={true} width="100%"/>

        </div>
    )}

    return null;
}