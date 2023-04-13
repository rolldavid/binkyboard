"use client"

import Image from "next/image"
import { PostItems } from "./types"
import { SyntheticEvent, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import styles from "./PostItem.module.css"
import pin from "../assets/pin.png"
import PostOptions from "./PostOptions"
import PostGallery from "./PostGallery"

export default function PostItem({post, boardId, pinnedPost }: {post: PostItems, boardId: string, pinnedPost: boolean}) {
    const [showOptions, setShowOptions] = useState(false)    
    const [showGallery, setShowGallery] = useState(false)
    const [selectedItem, setSelectedItem] = useState(0)

    const setPrepGallery = (e: SyntheticEvent, index: number) => {
        e.preventDefault()
        setSelectedItem(index)
        setShowGallery(true)
    }


    const readableDate = new Date(post.post.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long"
      });

    return (
        <>
        <div className={styles.container}>
            {pinnedPost && <div className={styles.pinnedMessage}>
                <Image src={pin} width={13} height={13} alt="pin" className={styles.pinnedImage} />
                <p className={styles.pinText}>Pinned Post</p>
            </div>}
            <div className={styles.headerContainer}>
                
                <div className={styles.headerItems}>
                    <p className={styles.displayName}>{post.displayName}</p>
                    <p className={styles.dot}>·</p>
                    <p className={styles.date}>{readableDate}</p>
                </div>
                {post.isOwner && <div className={styles.ownerActions}>
                    <p className={styles.postOptions} onClick={() => setShowOptions(true)}>···</p>
                </div>}
            </div>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {post.post.note}
                </p>
            </div>
            {post.slugs.length === 0 && post.socialUrl.length > 0 && <div className={styles.linkContainer}>
                <ReactPlayer url={post.socialUrl} controls={true} width="100%" />
            </div>

            }
            {post.slugs.length === 1 && <div className={styles.mediaContainer}>
                {         
                    post.slugs[0].type.includes("video") ?
                        <video controls className={styles.mediaItemOne} >
                            <source src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[0].slug}#t=0.1`} type="video/mp4" />
                                Your browser does not support HTML5 video.
                        </video> 
                        :
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[0].slug}`} 
                            width={800} 
                            height={800} 
                            alt="post image" 
                            className={styles.mediaItemOne}
                            onClick={(e) => setPrepGallery(e, 0)}
                        

                        />
                }
            </div>}
            {post.slugs.length === 2 && <div className={styles.mediaContainerTwo}>
                {
                    post.slugs.map((item, index) => {
                    return (
                        <div className={styles.mediaItemContainer} key={index}>
                            <Image 
                                src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[index].slug}`} 
                                width={250} 
                                height={250} 
                                alt="post image" 
                                className={styles.mediaItemTwo}
                                onClick={(e) => setPrepGallery(e, index)}
                          
                            />
                        </div>
                    )
                    })
                }
            </div>}
            {post.slugs.length === 3 && <div className={styles.mediaContainer}>
                <div className={styles.mediaContainerLeft}>
                    <div className={styles.mediaItemContainerLeft}>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[0].slug}`} 
                            width={250} 
                            height={250} 
                            alt="post image" 
                            className={styles.mediaItemLeft}
                            onClick={(e) => setPrepGallery(e, 0)}
                        />
                    </div>
                </div>
                <div className={styles.mediaContainerRight}>
                    <div className={styles.mediaItemContainerRight}>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[1].slug}`}  
                            width={250} 
                            height={250} 
                            alt="post image" 
                            className={styles.mediaItemRight}
                            onClick={(e) => setPrepGallery(e, 1)}
                        />
                    </div>
                    <div className={styles.mediaItemContainerRight}>
                        <img 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[2].slug}`}  
                            width={250} 
                            height={250} 
                            alt="post image" 
                            className={styles.mediaItemRight}
                            onClick={(e) => setPrepGallery(e, 2)}
                        />
                    </div>
                </div>
            </div>}
            {post.slugs.length === 4 && <div className={styles.mediaContainer}>
                <div className={styles.mediaContainerStack}>
                    <div className={styles.mediaItemContainerRight}>
                        <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[0].slug}`}  width={250} height={250} alt="post image" className={styles.mediaItemRight}/>
                    </div>
                    <div className={styles.mediaItemContainerRight}>
                        <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[1].slug}`}  width={250} height={250} alt="post image" className={styles.mediaItemRight}/>
                    </div>
                </div>
                <div className={styles.mediaContainerStack}>
                    <div className={styles.mediaItemContainerRight}>
                        <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[2].slug}`}  width={250} height={250} alt="post image" className={styles.mediaItemRight}/>
                    </div>
                    <div className={styles.mediaItemContainerRight}>
                        <Image src={`${process.env.NEXT_PUBLIC_AWS_URL}/${post.slugs[3].slug}`}  width={250} height={250} alt="post image" className={styles.mediaItemRight}/>
                    </div>
                </div>
    
            </div>}
                   
        </div>
        {showOptions && <PostOptions setShowOptions={setShowOptions} boardId={boardId} postId={post.post.id} isAdmin={post.isAdmin} isPinned={pinnedPost ? true : false}/>}
        {showGallery && <PostGallery setShowGallery={setShowGallery} slugs={post.slugs} selectedItem={selectedItem}/>}
        </>
        
    )
}