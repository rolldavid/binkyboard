"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import axios from "axios"
import { getBoard, updateHeader } from "@/lib/db-utils"
import { nanoid } from "nanoid"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CreatePost from "../post/components/CreatePost"
import Image from "next/image"
import gift from "./assets/gift.png"
import edit from "./assets/editButton.png"
import share from "./assets/share.png"
import banner from "./assets/banner.png"
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"
import ScrollToTop from "@/lib/ScrollToTop"


export default function Page({params: {board}}: {params: { board: string }}) {


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


    const handleBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const chosenFile = e.target.files;

        const s3id = nanoid()

        if (chosenFile) {
            const extensionIndex = chosenFile[0].name.lastIndexOf(".")
            const fileExtension = chosenFile[0].name.slice(extensionIndex)
            const { data: s3Data } = await axios.post(
                "/api/get-s3-url",
                {
                    filename: `${s3id}${fileExtension}`,
                    fileType: chosenFile[0].type
                }
            )

            const s3Url = s3Data.url
        
            await axios.put(s3Url, chosenFile[0], {
                headers: {
                    "Content-Type": chosenFile[0].type,
                    "Access-Control-Allow-Origin": "*",
                },
                });


           await updateHeader(`${s3id}${fileExtension}`, data.board.id)
           

        }
    }   

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
                {data.isOwner && <div className={styles.editBannerContainer}>
                        <label htmlFor="uploadBanner" className={styles.uploadItem}>
                            <Image className={styles.editBanner} 
                                src={edit}
                                width={35}
                                height={35}
                                alt="edit banner image"
                            />
                        </label>
                        
                    </div>
                    }
                 <div className={styles.headerContainer}>
                    <h2 className={styles.boardHeader}>{`${data.board.name}`}</h2>
                </div>
                <CreatePost />
                <p>Board Id: {board}</p>
            </div>
            <div className={styles.uploadHidden}>
                    <input 
                        id="uploadBanner"
                        className={styles.uploadItem} 
                        type="file" 
                        accept={"image/png, image/jpeg, audio/*, video/*, image/*"}
                        onChange={handleBanner}
                        hidden
                        />    
            </div>
            </>
        )
    }

   return null;
}