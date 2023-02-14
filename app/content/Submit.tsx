"use client"

import { SyntheticEvent, useState, useEffect, ClipboardEvent } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import styles from "./Submit.module.css"
import ReactPlayer from "react-player"

let linkInput = false;
let mediaInput = false;

export default function Submit() {
    const [note, setNote] = useState("")
    const [author, setAuthor] = useState("")
    const [showLink, setShowLink] = useState(false)
    const [showMedia, setShowMedia] = useState(false)
    const [linkPreview, setLinkPreview] = useState(false)
    const [mediaPreview, setMediaPreview] = useState(false)
   
    const [link, setLink] = useState("")
    const [media, setMedia] = useState<string[]>(["https://www.poblanocloud.com/kitchen.jpeg", ""])
    const [toggle, setToggle] = useState(false)


    const queryClient = useQueryClient()


    async function addSquare({note, author}: {note: string, author: string}) {
        const res = await fetch("/api/add-square", {
            method: "POST",
            body: JSON.stringify({
                note,
                author
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        return data
    }

    

    const showInput = (e: SyntheticEvent) => {
        e.preventDefault()
      
        mediaInput = false
        setMediaPreview(false)
        setLinkPreview(true)
        linkInput = !linkInput
        setShowLink(linkInput)
    }

    const handleLink = (e: ClipboardEvent) => {
        e.preventDefault()
        setLink(e.clipboardData.getData("text"))
        setLinkPreview(true)
    }
 
    const handleChange = (e: SyntheticEvent, val: string) => {
        e.preventDefault()
        setLink(val)
        setLinkPreview(false)
    }


    const showMediaContainer = (e: SyntheticEvent) => {
        e.preventDefault()
        
        linkInput = false
        setShowLink(false)
        setLinkPreview(false)
        mediaInput = !mediaInput
        setMediaPreview(mediaInput)
    }

    const { mutateAsync } = useMutation(addSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries(['squareData'])
          },
    });

  
    return (
        <section className={styles.container}>
            <form onSubmit={() => mutateAsync({note, author})} className={styles.formContainer}>
              
                    <textarea 
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className={styles.noteInput}
                        rows={5}
                        placeholder="Create a post for Kelly & baby"
                    />
                <div className={styles.uploadContainer}>
                    <button className={styles.uploadItem} onClick={showMediaContainer}>+Image/Video</button>
                    <button className={styles.uploadItem} onClick={showInput}>+YouTube/SoundCloud</button>
                </div>
                <section className={styles.previewSection}>
                    {linkInput && <div className={styles.addLinkContainer}>
                        <input 
                            className={styles.addLinkInput} 
                            value={link}
                            onPaste={handleLink}
                            onChange={(e) => handleChange(e, e.target.value)}
                            placeholder="Paste link"
                        />
                        
                    </div>}
                    {mediaPreview && <div className={styles.mediaContainer}>
                    
                            {
                                
                                media.map((item, index) => {
                                    return <div className={styles.mediaItem}>
                                        {!item ? <div className={styles.upload}>+</div> : <Image src={item} alt="kitchen" width="400" height="400"/>}
                                    </div>
                                })
                            }
                    
                    </div>}
                   
                    {linkPreview && <div className={styles.videoPreviewContainer}>
                        <ReactPlayer url={link} controls={true} width="100%" onError={() => setLinkPreview(false)}/>
                    </div>}
                </section>
                
                {/* <input 
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className={styles.authorInput}
                    placeholder="Your name"
                /> */}
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </section>
    )
}