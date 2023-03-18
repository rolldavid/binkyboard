"use client"

import Image from "next/image"
import { Post } from "@prisma/client"
import ReactPlayer from "react-player"
import styles from "./Post.module.css"

export default function Post({post}: {post: Post}) {
    return (
        <div className={styles.container}>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {post.note}
                </p>
                <p className={styles.author}>
                    from {post.userId}
                </p>
                <img src="https://d3h42dhdxazsqn.cloudfront.net/ancient-wizard.jpg" alt="wizard" className={styles.img}/>
            </div>
            
        </div>
    )
}