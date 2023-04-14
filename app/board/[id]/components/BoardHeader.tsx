
"use client"

import {  SetStateAction, Dispatch, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getBoardHeader } from "@/lib/db-utils"
import Image from "next/image"
import gift from "../assets/gift.png"
import banner from "../assets/banner.png"
import gear from "../assets/gear.png"
import Spinner from "@/lib/Spinner"
import styles from "./BoardHeader.module.css"

export default function BoardHeader({boardId, isOwner, setShowOptions, boardName, registry, headerUrl}: {boardId: string, isOwner: boolean, setShowOptions: Dispatch<SetStateAction<boolean>>, boardName: string, registry: string, headerUrl: string}) {

    return (
        <div className={styles.container}>
                <div className={styles.bannerContainer}>
                    <Image
                        src={`https://d3h42dhdxazsqn.cloudfront.net/${headerUrl}`}
                        width={600}
                        height={337}
                        alt="banner"
                        className={styles.bannerImg}
                    />
                </div>
                   
                <div className={styles.actionContainer}>
                    {registry.length > 0 ? <div className={styles.actionInnerContainer}>
                        <a target="_blank" href={`${registry}`} className={styles.giftItem} rel="noopener noreferrer">
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
                            width={45}
                            height={45}
                            alt="edit banner image"
                            onClick={() => setShowOptions(true)}
                        />
                    </div>
                </div>}
                <div className={styles.headerContainer}>
                    <h2 className={styles.boardHeader}>{`${boardName}`}</h2>
                </div>  
        </div>
         )

}

