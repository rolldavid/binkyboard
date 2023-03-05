"use client"

import Image from "next/image"
import { Square } from "@prisma/client"
import ReactPlayer from "react-player"
import styles from "./SquareContent.module.css"

export default function({content}: {content: Square}) {
    return (
        <div className={styles.container}>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {content.note}
                </p>
                <p className={styles.author}>
                    from {content.author}
                </p>

                
            </div>
            
        </div>
    )
}