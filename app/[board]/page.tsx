"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import { getBoard } from "@/lib/db-utils"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CreatePost from "../post/components/CreatePost"
import Image from "next/image"
import gift from "./assets/gift.png"
import gear from "./assets/gear.png"
import banner from "./assets/banner.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"
import ScrollToTop from "@/lib/ScrollToTop"
import BoardOptions from "./components/BoardOptions"


export default function Page({params: {board}}: {params: { board: string }}) {
    const [showOptions, setShowOptions] = useState(false)

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


  

    if (data && data.board && data.posts.length < 1) {
        
        return (
            <>
            <ScrollToTop />
            <div className={styles.container}>
                <div className={styles.bannerContainer}>
                    <Image
                        src={data.board.customHeader ?  
                            `https://d3h42dhdxazsqn.cloudfront.net/${data.board.headerURL}` : 
                            banner
                        }
                        width={600}
                        height={337}
                        alt="banner"
                        className={styles.bannerImg}
                    />
                    
                </div>
               
                
               <div className={styles.actionContainer}>
                    {data.board.registry.length > 0 && <div className={styles.actionInnerContainer}>
                         <a target="_blank" href={`${data.board.registry}`} className={styles.navItem}>
                            <Image 
                                src={gift}
                                width={25}
                                height={25}
                                alt="registry link"
                            />
                        </a> 
                    </div>}
                    {data.board.registry.length === 0 && <div className={styles.actionInnerContainerHold}>

                    </div>}
                </div>
                {data.isOwner && <div className={styles.editBoardContainer}>
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
                    }
                {/* <label htmlFor="uploadBanner" className={styles.uploadItem}></label> */}
                 <div className={styles.headerContainer}>
                    <h2 className={styles.boardHeader}>{`${data.board.name}`}</h2>
                </div>
                <CreatePost />
                <p>Board Id: {board}</p>
            </div>
            
            {showOptions &&  
                <BoardOptions board={data.board} setShowOptions={setShowOptions}/> 
            }
            </>
        )
    }

   return null;
}