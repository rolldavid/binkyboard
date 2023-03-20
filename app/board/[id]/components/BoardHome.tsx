"use client"

import {  useState } from "react"
import { getBoard } from "@/lib/db-utils"
import { useQuery, useQueryClient} from "@tanstack/react-query"
import CreatePost from "./CreatePost"
import Image from "next/image"
import gift from "../assets/gift.png"
import gear from "../assets/gear.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"
import BoardOptions from "./BoardOptions"
import Collection from "@/app/post/components/Collection"


export default function Page({boardId}: {boardId: string}) {
    const [showOptions, setShowOptions] = useState(false)

    const { data, status } = useQuery(["boardMain"], () => {
        return getBoard(boardId)
      });
    
     /* useEffect(() => {
        localStorage.setItem("invite", boardId)
        
    }, [])   */

   
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
                    <CreatePost boardId={boardId}/> 
                    <Collection boardId={boardId}/> 
                    {showOptions &&  
                    <BoardOptions board={data.board} setShowOptions={setShowOptions}/>}
            </div>
        )
    } 
    
    if (status === "success" && data) {
           
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
                        Public
                       {/*  <CreatePost boardId={boardId}/> */}
                        {/* <Collection boardId={boardId}/> */}
                        
                </div>
            )
           
        } 
        return null;
}


