"use client"

import Image from "next/image"
import { PostItems } from "./types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SyntheticEvent, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import styles from "./PostItem.module.css"
import { deletePost } from "@/lib/db-utils"
import PostOptions from "./PostOptions"

export default function PostItem({post, slugs, boardId }: {post: PostItems, slugs: string[], boardId: string}) {
    const [showOptions, setShowOptions] = useState(false)

    const readableDate = new Date(post.post.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long"
      });

    return (
        <>
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.headerItems}>
                    <p className={styles.displayName}>{post.displayName}</p>
                    <p className={styles.dot}>·</p>
                    <p className={styles.date}>{readableDate}</p>
                </div>
                {post.isOwner && <div className={styles.ownerActions}>
                    <p className={styles.postOptions} onClick={() => setShowOptions(true)}>···</p>
                </div>}
            </div>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {post.post.note}
                </p>
            </div>
            <div className={styles.imageContainer}>
                    {slugs.length === 1 && <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[0]}`} width={1200} height={675} alt="post image" className={styles.imageOne}/>}
                </div>
        </div>
        {showOptions && <PostOptions setShowOptions={setShowOptions} boardId={boardId} postId={post.post.id}/>}
        </>
        
    )
}