"use client"

import {  useEffect, useState } from "react"
import { getBoard } from "@/lib/db-utils"
import { useQuery, useQueryClient} from "@tanstack/react-query"
import CreatePost from "./components/CreatePost"
import Image from "next/image"
import gift from "./assets/gift.png"
import gear from "./assets/gear.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"
import BoardOptions from "./components/BoardOptions"
import Collection from "../post/components/Collection"

let user: string | null = ""

export default function Page({params: {board}}: {params: { board: string }}) {
    const [showOptions, setShowOptions] = useState(false)



    const { data, status } = useQuery(["board"], () => {
        return getBoard(board)
      });

    
  
    useEffect(() => {
        localStorage.setItem("invite", board)
        user = localStorage.getItem("user")
    }, [])

   

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success" && data && data.isOwner) {
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
                        {data.board.registry.length > 0 && <div className={styles.actionInnerContainer}>
                            <a target="_blank" href={`${data.board.registry}`} className={styles.giftItem} rel="noopener noreferrer">
                                <Image 
                                    src={gift}
                                    width={25}
                                    height={25}
                                    alt="registry link"
                                />
                            </a> 
                        </div>}
                        {data.board.registry.length === 0 && <div className={styles.actionInnerContainerHold}></div>}
                    </div>
                    <div className={styles.editBoardContainer}>
                        <div className={styles.editBoardButton}>
                            <Image className={styles.editBoard} 
                                src={gear}
                                width={30}
                                height={30}
                                alt="edit banner image"
                                onClick={() => setShowOptions(true)}
                            />
                        </div>
                    </div>
                        
                    <div className={styles.headerContainer}>
                        <h2 className={styles.boardHeader}>{`${data.board.name}`}</h2>
                    </div>
                    <CreatePost boardId={board} />
                    <Collection boardId={board}/>
                    
                    {showOptions &&  
                    <BoardOptions board={data.board} setShowOptions={setShowOptions}/>}
            </div>
        )
    }

    if (data && !data.board.public && !data.isOwner && user) {
          
            if (data.board.allowList && data.board.allowList.includes(user)) {
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
                            {data.board.registry.length > 0 && <div className={styles.actionInnerContainer}>
                                <a target="_blank" href={`${data.board.registry}`} className={styles.giftItem} rel="noopener noreferrer">
                                    <Image 
                                        src={gift}
                                        width={25}
                                        height={25}
                                        alt="registry link"
                                    />
                                </a> 
                            </div>}
                            {data.board.registry.length === 0 && <div className={styles.actionInnerContainerHold}></div>}
                        </div>
                        <div className={styles.headerContainer}>
                            <h2 className={styles.boardHeader}>{`${data.board.name}`}</h2>
                        </div>
                        <CreatePost boardId={board} />
                        <Collection boardId={board}/>
                        
                </div>
                )
            
            } else {
                return (
                    <div>
                    The owner has set this board to private. Request access.
                </div>
                )
            }
        
    }


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
                {data.board.registry.length > 0 && <div className={styles.actionInnerContainer}>
                    <a target="_blank" href={`${data.board.registry}`} className={styles.giftItem} rel="noopener noreferrer">
                        <Image 
                            src={gift}
                            width={25}
                            height={25}
                            alt="registry link"
                        />
                    </a> 
                </div>}
                {data.board.registry.length === 0 && <div className={styles.actionInnerContainerHold}></div>}
            </div>
            <div className={styles.headerContainer}>
                <h2 className={styles.boardHeader}>{`${data.board.name}`}</h2>
            </div>
            <CreatePost boardId={board} />
            <Collection boardId={board}/>
          
        </div>
    )
}


export const dynamic = 'force-dynamic'

