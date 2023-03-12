"use client"

import { getBoard } from "@/lib/db-utils"
import { useQuery } from "@tanstack/react-query"
import CreatePost from "../post/components/CreatePost"
import Image from "next/image"
import gift from "./assets/gift.png"
import star from "./assets/star.png"
import share from "./assets/share.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"

export default function Page({params: {board}}: {params: { board: string }}) {

    const { data, status } = useQuery(["board"], () => {
        return getBoard(board)
      });


    if (status === "loading") {
        return <Spinner />
    }

    if (data && data.board && data.posts.length < 1) {
        return (
            <div className={styles.container}>
                <div className={styles.actionContainer}>
                {data.board.registry && <a target="_blank" href={`${data.board.registry}`} className={styles.navItem}>
                    <Image 
                        src={gift}
                        width={25}
                        height={25}
                        alt="registry link"
                    />
                </a> 
            
                }
                
                <Image 
                        src={star}
                        width={25}
                        height={25}
                        alt="save"
                />
                <Image 
                        src={share}
                        width={25}
                        height={25}
                        alt="share"
                />
                </div>
                <CreatePost />
                <p>Board Id: {board}</p>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.actionContainer}>
            <a target="_blank" href={"#"} className={styles.navItem}>
                <Image 
                    src={gift}
                    width={25}
                    height={25}
                    alt="registry link"
                />
            </a>
                <p>Save</p>
                <p>Share</p>
            </div>
            <CreatePost />
            <p>Board Id: {board}</p>
        </div>
    )
}