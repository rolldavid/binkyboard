"use client"

import Image from "next/image"
import type { User, Post } from "@prisma/client"
import { useEffect, useState } from "react"
import { getPostUser } from "@/lib/db-utils"
import ReactPlayer from "react-player"
import styles from "./PostItem.module.css"

export default function PostItem({post, slugs}: {post: Post, slugs: string[]}) {
    
    
    const readableDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long"
      });


    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.displayName}>Bob</p>
                <p className={styles.dot}>·</p>
                <p className={styles.date}>{readableDate}</p>
            </div>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {post.note}
                </p>
            </div>
            <div className={styles.imageContainer}>
                    {slugs.length === 1 && <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[0]}`} width={1200} height={675} alt="post image" className={styles.imageOne}/>}
                </div>
        </div>
    )
}