"use client"

import Image from "next/image"
import { PostItems } from "./types"

import { SyntheticEvent, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import styles from "./PostItem.module.css"
import { deletePost } from "@/lib/db-utils"

export default function PostItem({post, slugs, isOwner, boardId}: {post: PostItems, slugs: string[], isOwner: boolean, boardId: string}) {
    const [showOptions, setShowOptions] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const readableDate = new Date(post.post.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long"
      });

    const handleDelete = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log("removing post")
        const remove = await deletePost(boardId, post.post.id)
    }

  
    return (
        <>
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.headerItems}>
                    <p className={styles.displayName}>{post.displayName}</p>
                    <p className={styles.dot}>·</p>
                    <p className={styles.date}>{readableDate}</p>
                </div>
                {isOwner && <div className={styles.ownerActions}>
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
             
         
        {showOptions && <div className={styles.optionsContainer}>
            <div className={styles.optionsModule}>
                
                <button className={styles.saveButton} >
                    Pin Post
                </button>
                {!confirmDelete && <button className={styles.deleteButton} onClick={() => setConfirmDelete(true)}>
                    Delete Post
                </button>}
                {confirmDelete && <button className={styles.deleteButton} onClick={handleDelete}>
                    Yes, delete this post
                </button>}
                <button className={styles.cancelButton} onClick={() => setShowOptions(false)}>
                    Cancel
                </button>
                    
            </div>
        </div>}
        </>
    )
}