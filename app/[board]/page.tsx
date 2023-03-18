"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import { getBoard, getBoardName } from "@/lib/db-utils"
import { useQuery } from "@tanstack/react-query"
import CreatePost from "../post/components/CreatePost"
import Image from "next/image"
import gift from "./assets/gift.png"
import gear from "./assets/gear.png"
import banner from "./assets/banner.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"
import ScrollToTop from "@/lib/ScrollToTop"
import BoardOptions from "./components/BoardOptions"

/* async function getName(id: string) {
    return await getBoardName(id)
  }
  
export async function generateMetadata({params: {board}}: {params: { board: string }}) {
    console.log("get name")
    const res = await getName(board);
    console.log(res, "name: ")
    return { title: res.boardName }
  }
 */


export default function Page({params: {board}}: {params: { board: string }}) {
    const [showOptions, setShowOptions] = useState(false)

    const { data, status } = useQuery(["board"], () => {
        return getBoard(board)
      });
  
    useEffect(() => {
        localStorage.setItem("invite", board)
    }, [])

    if (status === "loading") {
        return <Spinner />
    }

    if (data && data.board && !data.board.public && !data.isOwner) {
        const user = localStorage.getItem("user")
        if (data.board.allowList) {
            const isUser = data.board.allowList.includes(user)
          
            if (isUser) {
                console.log("you rock")
            } else {
                return (
                    <div>
                        Sorry not allowed
                    </div>
                )
            }
        } else {
            return (
                <div>
                    The owner has set this board to private. Request access.
                </div>
            )
        }
    }

    if (data && data.board) {
        
        return (
            <>
            <ScrollToTop />
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

