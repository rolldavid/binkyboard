
"use client"

import {  SetStateAction, Dispatch, SyntheticEvent, useState, useEffect } from "react"
import Image from "next/image"
import share from "../assets/share.png"
import gear from "../assets/gear.png"
import styles from "./BoardHeader.module.css"

export default function BoardHeader({boardId, isOwner, setShowOptions, boardName, registry, headerUrl}: {boardId: string, isOwner: boolean, setShowOptions: Dispatch<SetStateAction<boolean>>, boardName: string, registry: string, headerUrl: string}) {
    const [showCopy, setShowCopy] = useState(false)

    const copyLink = (e: SyntheticEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/board/${boardId}`)
        setShowCopy(true)
        setTimeout(() => {
            setShowCopy(false)
        }, 1500)
    }

    useEffect(() => {
        const body = document.querySelector("body")
        if (body && showCopy) {
            body.style.overflow = "hidden"
        }

        if (body && !showCopy) {
            body.style.overflow = "auto"
        }

        return () => {
            
            const body = document.querySelector("body")

            if (body) {
                body.style.overflow = "auto"
            }
        }
    }, [showCopy])

    

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
                     <div className={styles.actionInnerContainer}>
                        <div className={styles.giftItem}>
                            <Image 
                                src={share}
                                width={25}
                                height={25}
                                alt="registry link"
                                className={styles.shareIcon}
                                onClick={copyLink}
                            />
                        </div> 
                    </div> 
                </div>
                {isOwner && <div className={styles.editBoardContainer}>
                    <div className={styles.editBoardButton}>
                        <Image className={styles.editBoard} 
                            src={gear}
                            width={40}
                            height={40}
                            alt="edit banner image"
                            onClick={() => setShowOptions(true)}
                        />
                    </div>
                </div>}
                <div className={styles.headerContainer}>
                    <h2 className={styles.boardHeader}>{`${boardName}`}</h2>
                    {registry.length > 0 && <a 
                        target="_blank" 
                        rel="noreferrer"
                        className={styles.registryLink}
                        href={registry.includes("http") ? registry : `http://${registry}`}
                        >
                            Registry
                    </a>}
                </div>  
                {showCopy && <div className={styles.copyContainer}>
                    <div className={styles.copyInnerContainer}>
                        <div className={styles.copyMessageContainer}>
                            <p className={styles.copyMessage}>✓ Board Link Copied</p>
                        </div>
                    </div>
                </div>}
        </div>
         )

}

