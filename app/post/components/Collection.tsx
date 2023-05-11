"use client"

import React, {useEffect, useState} from "react"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPinnedPost } from "@/lib/db-utils"
import { PostItems } from "./types"
import PostItem from "./PostItem"
import styles from "./Collection.module.css"
import Spinner from "@/lib/Spinner"

let scroll = 0;
let firstLoad = true;

export default function Collection({boardId, isOwner, }: {boardId: string, isOwner: boolean}) {
    

    
    const { data: pinData, status: pinStatus } = useQuery(["pinnedPost"], () => {
        return getPinnedPost(boardId)
    })

    
    const getInfinitePosts = async ({ pageParam = 1}) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-infinite-posts?cursor=${pageParam}`,
          {
            method: "POST",
            body: JSON.stringify({
                boardId
            }),
            headers: {
                "Content-Type": "application/json"
            }
          }
        );
       
        return res.json();
      };

      const {
        data,
        error,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery(["collection"], getInfinitePosts, {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      });

      useEffect(() => {

        const handleScroll = async () => {
          
          const position = window.pageYOffset
          if (scroll + 250 <= position) {
            scroll = position
            fetchNextPage();
          }
        };
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
      }, []);
    
    
    if (status === "loading") {
        <Spinner />
    }

    if (isLoading) {
        return <Spinner />
    }


    if (status === "success" && data) {
            
           
            return (
                <>
                <div className={styles.container}>
                    {pinStatus == "success" && pinData && pinData.pinned && <div >
                        <PostItem post={pinData.pinned} boardId={boardId} pinnedPost={true}/>
                        
                    </div>}
                    <div className={styles.postContainer}>
                        
                        {
                            data.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                    {
                                    group.posts.map((post: PostItems, index: number) => (
                            
                                        <PostItem key={index} post={post} boardId={boardId} pinnedPost={false}/>
                                        
                                    ))}
                                </React.Fragment>
                        ))}
                        
                    </div>
                </div>
                {isFetchingNextPage && (
                    <div className={styles.loadMore}>
                        <Spinner />
                    </div>
                )}
                </>
             )
        }

    return null;
}


// <ReactPlayer url="https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock" controls={true} width="100%"/>