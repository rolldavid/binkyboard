"use client"

import axios from "axios";
import { nanoid } from 'nanoid'
import { SyntheticEvent, useState, useEffect, ClipboardEvent } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ScrollToTop from "@/lib/ScrollToTop";
import { createNewPost } from "@/lib/db-utils";
import styles from "./CreatePost.module.css"
import ReactPlayer from "react-player"
import img from "../assets/img.png"
import mov from "../assets/mov.png"
import Spinner from "@/lib/Spinner";

let linkInput = false;
let mediaInput = false;
let holdLink = ""
let linkChecked = false;


interface PreviewFiles {
    url: string
    type: string
}

export default function Submit({boardId}: {boardId: string}) {
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [linkPreview, setLinkPreview] = useState(false)
    const [toggleLink, setToggleLink] = useState(false)
    const [mediaPreview, setMediaPreview] = useState(false)
    const [mediaPreviewTwo, setMediaPreviewTwo] = useState(false)
    const [mediaPreviewThree, setMediaPreviewThree] = useState(false)
    const [mediaPreviewFour, setMediaPreviewFour] = useState(false)
    const [mediaList, setMediaList] = useState<File[]>([])
    const [mediaPreviewList, setMediaPreviewList] = useState<PreviewFiles[]>([])
    const [rowCount, setRowCount] = useState(2)
    const [acceptMedia, setAcceptMedia] = useState("image/png, image/jpeg, audio/*, video/*, image/*")
    const [allowUpload, setAllowUpload] = useState(true)
    const [mediaClass, setMediaClass] = useState("")
    const [mediaDetailClass, setMediaDetailClass] = useState("")
    const [link, setLink] = useState("")
    const [toggleMedia, setToggleMedia] = useState(false)
    
    const queryClient = useQueryClient()
    
    // upload post to server
    async function addPost({note}: {note: string}) {

        let slugList: string[] = []

        if (mediaList) {
            setLoading(true)
            for (let i = 0; i < mediaList.length; i++) {
                const s3id = nanoid()
                const extensionIndex = mediaList[i].name.indexOf(".")
                const fileExtension = mediaList[i].name.slice(extensionIndex)
                const { data } = await axios.post(
                    "/api/get-s3-url",
                    {
                        filename: `${s3id}${fileExtension}`,
                        fileType: mediaList[i].type
                    }
                )
    
                const url = data.url
           
                console.log(url)
                await axios.put(url, mediaList[i], {
                    headers: {
                      "Content-Type": mediaList[i].type,
                      "Access-Control-Allow-Origin": "*",
                    },
                  });

               
                slugList.push(`${s3id}${fileExtension}`)
                
            }
        
            const addPost = await createNewPost(boardId, note, slugList)
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
            }, 1000)
            await queryClient.invalidateQueries(['postData'])
        
            
        }
        setNote("")
        setMediaList([])
        setMediaPreviewList([])
        setMediaPreview(false)
        setLoading(false)
    }

    // handle when user is typing a note
    const handleChange = async (e: SyntheticEvent, val: string) => {
        e.preventDefault()
        setNote(val)
        const lines = val.match(/\n/g)
        if (lines) {
            setRowCount(lines.length + 1)
        }
       
        if (linkChecked) {
            setToggleLink(prev => !prev)
        }
    }


    // handle files when user selects them 
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const chosenFile = e.target.files;

        if (chosenFile && !chosenFile[0]) {
            return;
        }
    
        if (mediaPreviewList.length >= 4) {
            console.log("Add a max of 4 files to your post");
            return;
        }

        if (mediaPreviewList.length === 0) {
            setAcceptMedia("image/png, image/jpeg, audio/*, image/*")

        } 


        
        if (chosenFile && chosenFile[0].type) {
            setMediaList([...mediaList, chosenFile[0]])
            let reader = new FileReader()

            if (chosenFile[0].type.includes("video") || chosenFile[0].type.includes("mp4")) {
                if (mediaPreviewList.length === 0) {
                    setAllowUpload(false)
                }
                reader.onload = e => {
                    let blobData = reader.result;
               };

                reader.onloadend = () => {
                    setMediaPreviewList([...mediaPreviewList, {url: reader.result as string, type: chosenFile[0].type}])
                    
                    setMediaPreview(true)
                    
                  };
                  reader.readAsDataURL(chosenFile[0])
            } else {
                reader.onloadend = () => {
                    setMediaPreviewList([...mediaPreviewList, {url: reader.result as string, type: chosenFile[0].type}])
                    setMediaPreview(true)
                };
                reader.readAsDataURL(chosenFile[0])
            }
        }
        
    }

 
    useEffect(() => {
       setToggleMedia(prev => !prev)
    }, [mediaPreviewList])

    useEffect(() => {
        if (mediaPreviewList.length === 1) {
            setLinkPreview(false)
            setMediaPreview(true)
        } else if (mediaPreviewList.length === 2) {
            setMediaPreview(false)
            setMediaPreviewTwo(true)
        } else if (mediaPreviewList.length === 3) {
            setMediaPreviewTwo(false)
            console.log("media preview two", mediaPreviewTwo)
            setMediaPreviewThree(true)
            console.log("media preview three", mediaPreviewTwo)
        } else if (mediaPreviewList.length === 4) {
            setMediaPreviewThree(false)
            setMediaPreviewFour(true)
        }

        if (mediaPreviewList.length < 1) {
            if (link.length > 0 && linkChecked) {
                setLinkPreview(true)
                setMediaPreview(false)
            } else {
                setMediaPreview(false)
            }
        }
    }, [toggleMedia])


    useEffect(() => {
        if (!note.includes(holdLink)) {
            setLink("")
            setLinkPreview(false);
            linkChecked = false;
        }
    }, [toggleLink])



    const handleLink = (e: ClipboardEvent) => {
        e.preventDefault()
        setNote(prev => prev + e.clipboardData.getData("text"))
        holdLink = e.clipboardData.getData("text")
        setLink(e.clipboardData.getData("text"))
        if ((!linkChecked && e.clipboardData.getData("text").includes("youtube")) || (!linkChecked && e.clipboardData.getData("text").includes("soundcloud"))) {
            setLinkPreview(true)
            linkChecked = true;
        }
    }


    const { mutateAsync } = useMutation(addPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['squareData'])
          },
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await mutateAsync({note})
    }

  
    return (
        <section className={styles.container}>
            {!loading && <form onSubmit={e => handleSubmit(e)} className={styles.formContainer}>
              <div className={styles.contentContainer}>
                <textarea 
                    value={note}
                    onChange={(e) => handleChange(e, e.target.value)}
                    onPaste={handleLink}
                    className={styles.noteInput}
                    rows={rowCount}
                    placeholder="Create a post"
                />
                <section className={styles.previewSection}>
                    {linkPreview && <div className={styles.videoPreviewContainer}>
                            <ReactPlayer url={link} controls={true} width="100%" onError={() => setLinkPreview(false)}/>
                    </div>}
                    
                    {/* {mediaPreview && <div className={styles.mediaContainer}>
                        {
                            mediaPreviewList.map((item, index) => {
                                return <div className={index === 2 && mediaClass === "mediaClassThree" ? styles.mediaClassThreeThird : styles[mediaClass]} key={index}>
                                    {item.type.includes("video") ? 
                                        <video controls className={styles[mediaDetailClass + "Vid"]}>
                                            <source src={item.url} type="video/mp4" />
                                                Your browser does not support HTML5 video.
                                        </video>
                                        : <img src={item.url} alt="preview image" className={styles[mediaDetailClass]}/>
                                    }
                                </div>
                            })
                        }
                    </div>} */}

                    {mediaPreview && <div className={styles.mediaContainer}>
                        {
                            mediaPreviewList.map((item, index) => {
                                return (
                                    <div className={styles.mediaItem} key={index}>
                                        {
                                            item.type.includes("video") ?
                                                <video controls className={styles.mediaItemVid}>
                                                    <source src={item.url} type="video/mp4" />
                                                        Your browser does not support HTML5 video.
                                                </video>
                                                : <img src={item.url} alt="preview image" className={styles.mediaItemImg}/>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>}

                    {mediaPreviewTwo && <div className={styles.mediaContainerTwo}>
                    {
                            mediaPreviewList.map((item, index) => {
                                return (
                                    <div className={styles.mediaItemTwo} key={index}>
                                        <img src={item.url} alt="preview image" className={styles.mediaItemTwoImg}/>
                                    </div>
                                )
                            })
                        }
                    </div>}

                    {mediaPreviewThree && <div className={styles.mediaContainerThree}>
                    {
                            mediaPreviewList.map((item, index) => {
                                
                                    return (
                                        <div className={styles.mediaItemThreeBig} key={index}>
                                    
                                             <img src={item.url} alt="preview image" className={styles.mediaItemThreeImg}/>
                                        
                                        </div>
                                    )
                                
                                
                            })
                        }
                    </div>}

                </section>
              </div>
                    
              
               
                <div className={styles.postActions}>
                    <div className={styles.uploadContainer}>
                        {allowUpload ? <label htmlFor="upload" className={styles.uploadItem}>
                            <Image src={img} width={27} height={25} alt="image icon"/>
                        </label> : 
                        <div className={styles.uploadItemGrey}>
                            <Image src={img} width={27} height={25} alt="image icon"/>
                         </div>
                        }
                        {mediaPreviewList.length < 1 ? <label htmlFor="upload" className={styles.uploadItem}>
                            <Image src={mov} width={35} height={25} alt="movie icon"/>
                        </label> :
                        <div className={styles.uploadItemGrey}>
                            <Image src={mov} width={35} height={25} alt="movie icon"/>
                        </div>
                        
                    }
                    </div>
                    <button type="submit" className={styles.submitButton}>Share</button>
                </div>
                <div className={styles.uploadHidden}>
                    <input 
                        id="upload"
                        className={styles.uploadItem} 
                        type="file" 
                        accept={acceptMedia}
                        onChange={handleUpload}
                        hidden
                        />    
                </div>
            </form>}
            {loading && <div><Spinner /></div>}
            {submitted && <ScrollToTop />}
        </section>
    )
}