"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import { getBoard } from "@/lib/db-utils"
import { updateStar } from "@/lib/db-utils"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CreatePost from "../post/components/CreatePost"
import Image from "next/image"
import gift from "./assets/gift.png"
import star from "./assets/star.png"
import starFull from "./assets/starFull.png"
import share from "./assets/share.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"


export default function Page({params: {board}}: {params: { board: string }}) {

    const [starred, setStarred] = useState(false)
    const queryClient = useQueryClient()

    const { data, status } = useQuery(["board"], () => {
        return getBoard(board)
      });

    /* useEffect(() => {
        if (status === "success" && data) {
        if (data.isStarred) {
            console.log("is starred")
            setStarred(true)
        } else {
            setStarred(false)
            console.log("is not starred")
        }
    }
    }, [data])
     */
    
 
    const updateStar = useMutation(async ({star,boardId}: {star: boolean, boardId: string}) => {
        return fetch("/api/update-star", {
            method: "POST",
            body: JSON.stringify({
                star,
                boardId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        },
        {
            
            onSuccess: () => {
                queryClient.invalidateQueries(['board'])
            },
        })

    if (status === "loading") {
        return <Spinner />
    }

  

    if (data && data.board && data.posts.length < 1 ) {

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
                
                {data.isStarred ? <Image 
                        src={starFull}
                        width={25}
                        height={25}
                        alt="remove star"
                        onClick={() => updateStar.mutate({star: false, boardId: data.board.id})}
                /> :
                <Image 
                        src={star}
                        width={25}
                        height={25}
                        alt="add star"
                        onClick={() => updateStar.mutate({star: true, boardId: data.board.id})}
                />
                }
            
                {/* <Image 
                        src={share}
                        width={25}
                        height={25}
                        alt="share"
                /> */}
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