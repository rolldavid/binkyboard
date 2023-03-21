
"use client"

import {  SetStateAction, Dispatch, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getBoardHeader } from "@/lib/db-utils"
import Image from "next/image"
import gift from "../assets/gift.png"
import gear from "../assets/gear.png"
import Spinner from "@/lib/Spinner"
import styles from "./BoardHeader.module.css"

export default function BoardHeader({boardId, isOwner, setShowOptions}: {boardId: string, isOwner: boolean, setShowOptions: Dispatch<SetStateAction<boolean>>}) {

    const { data, status } = useQuery(["boardHeader"], () => {
        return getBoardHeader(boardId)
      });


    if (status === "loading") {
        return <Spinner />
    }

    

    if (status === "success" && data && data.board) {
       
    return (
        <div className={styles.container}>
                <div className={styles.bannerContainer}>
                    <Image
                        src={`https://d3h42dhdxazsqn.cloudfront.net/${data.board.headerUrl}`}
                        width={600}
                        height={337}
                        alt="banner"
                        className={styles.bannerImg}
                    />
                    
                </div>
                   
                <div className={styles.actionContainer}>
                    {data.board.registry && data.board.registry.length > 0 ? <div className={styles.actionInnerContainer}>
                        <a target="_blank" href={`${data.board.registry}`} className={styles.giftItem} rel="noopener noreferrer">
                            <Image 
                                src={gift}
                                width={25}
                                height={25}
                                alt="registry link"
                            />
                        </a> 
                    </div> :
                    <div className={styles.actionInnerContainerHold}></div>
                    }
                    
                </div>
                {isOwner && <div className={styles.editBoardContainer}>
                    <div className={styles.editBoardButton}>
                        <Image className={styles.editBoard} 
                            src={gear}
                            width={30}
                            height={30}
                            alt="edit banner image"
                            onClick={() => setShowOptions(true)}
                        />
                    </div>
                </div>}
                <div className={styles.headerContainer}>
                    <h2 className={styles.boardHeader}>{`${data.board.name}`}</h2>
                </div>  
        </div>
         )
    }
    return null;
}

