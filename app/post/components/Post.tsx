"use client"

import Image from "next/image"
import { Post } from "@prisma/client"
import ReactPlayer from "react-player"
import styles from "./Post.module.css"
import ScrollToTop from "@/lib/ScrollToTop"

export default function PostItem({post, slugs}: {post: Post, slugs: string[]}) {
    console.log(slugs[0])
    return (
        <div className={styles.container}>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {post.note}
                </p>
                <p className={styles.author}>
                    from {post.userId}
                </p>

                {slugs.map((s, index) => {
                    return (
                        <div key={index}>
                            <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${s}`} width={1200} height={675} alt="post image" className={styles.img}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}