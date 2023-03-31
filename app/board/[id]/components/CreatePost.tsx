"use client"


import axios from "axios";
import { nanoid } from 'nanoid'
import { SyntheticEvent, useState, useEffect, ClipboardEvent, SetStateAction, Dispatch } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewPost } from "@/lib/db-utils";
import styles from "./CreatePost.module.css"
import ReactPlayer from "react-player"
import img from "../assets/img.png"
import mov from "../assets/mov.png"
import Spinner from "@/lib/Spinner";


let holdLink = ""
let linkChecked = false;
let uploading = false;

interface PreviewFiles {
    url: string
    type: string
}

export default function Submit({boardId}: {boardId: string}) {

    const queryClient = useQueryClient()

    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState("")
    const [dbSlugs, setdbSlugs] = useState<string[]>([])
    const [linkPreview, setLinkPreview] = useState(false)
    const [toggleLink, setToggleLink] = useState(false)
    const [mediaPreview, setMediaPreview] = useState(false)
    const [mediaPreviewList, setMediaPreviewList] = useState<PreviewFiles[]>([])
    const [rowCount, setRowCount] = useState(2)
    const [acceptMedia, setAcceptMedia] = useState("image/png, image/jpeg, audio/*, video/*, image/*, video/mp4, video/mov, video/x-m4v")
    const [allowUpload, setAllowUpload] = useState(true)
    const [link, setLink] = useState("")
    const [toggleMedia, setToggleMedia] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [submitStyle, setSubmitStyle] = useState("readyButton")
    
   
    async function addPost({note}: {note: string}) {
        async function checkFlag() {
            setLoading(true)
            if(uploading) {
               window.setTimeout(checkFlag, 100); 
            } else {
                await createNewPost(boardId, note, dbSlugs)
                setDisabled(true)
                setSubmitStyle("submittingButton")
                setNote("")
                setRowCount(2)
                setdbSlugs([])
                setMediaPreviewList([])
                setMediaPreview(false)
                setDisabled(false)
                setSubmitStyle("readyButton")
                setAcceptMedia("image/png, image/jpeg, audio/*, video/*, image/*, video/mp4, video/mov, video/quicktime, video/x-m4v")
                queryClient.invalidateQueries(['collection'])
                window.scrollTo({
                    top: 0,
                    left: 0
                  });
                setLoading(false)
            }
        }
        checkFlag();
        
    }

    useEffect(() => {
        if (mediaPreviewList.length === 2) {
            window.scrollTo({
                top: 150,
                left: 0
              });
        }
    }, [mediaPreviewList])
   

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

        setLinkPreview(false)
    
        if (mediaPreviewList.length >= 4) {
            console.log("Add a max of 4 files to your post");
            return;
        }

        if (mediaPreviewList.length === 0) {
            setAcceptMedia("image/png, image/jpeg, image/*")
        } 


        if (chosenFile && chosenFile[0].type) {
            
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

             startUpload(chosenFile[0])
        }
    }

   

    const startUpload = async (file: File) => {
            
            uploading = true
            const s3id = nanoid()
            const extensionIndex = file.name.lastIndexOf(".")
            const fileExtension = file.name.slice(extensionIndex)
            const { data } = await axios.post(
                "/api/get-s3-url",
                {
                    filename: `${s3id}${fileExtension}`,
                    fileType: file.type
                }
            )

            const url = data.url
        
            await axios.put(url, file, {
                headers: {
                    "Content-Type": file.type,
                    "Access-Control-Allow-Origin": "*",
                },
                });

            dbSlugs.push(`${s3id}${fileExtension}`)
            console.log("uploaded...")
            uploading = false
    }

 
    useEffect(() => {
       setToggleMedia(prev => !prev)
    }, [mediaPreviewList])

   
    useEffect(() => {
        if (!note.includes(holdLink)) {
            setLink("")
            setLinkPreview(false);
            linkChecked = false;
        }
    }, [toggleLink, note])



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
            queryClient.invalidateQueries(['board'])
          },
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await mutateAsync({note})
    }

  
    return (
        <div className={styles.container}>
             <form onSubmit={e => handleSubmit(e)} className={styles.formContainer}>
              <div className={styles.contentContainer}>
                <textarea 
                    value={note}
                    onChange={(e) => handleChange(e, e.target.value)}
                    onPaste={handleLink}
                    className={styles.noteInput}
                    rows={rowCount}
                    placeholder="Create a post"
                />
                <div className={styles.previewSection}>
                    {linkPreview && <div className={styles.videoPreviewContainer}>
                            <ReactPlayer url={link} controls={true} width="100%" onError={() => setLinkPreview(false)}/>
                    </div>}
                    

                    {mediaPreview && mediaPreviewList.length === 1 && <div className={styles.mediaContainer}>
                        {         
                            mediaPreviewList[0].type.includes("video") ?
                                <video controls className={styles.mediaItemOne}>
                                    <source src={mediaPreviewList[0].url} type="video/mp4" />
                                    Your browser does not support HTML5 video.
                                </video> : 
                                <img src={mediaPreviewList[0].url} alt="preview image" className={styles.mediaItemOne}/>
                        }
                    </div>}
                    {mediaPreview && mediaPreviewList.length === 2 && <div className={styles.mediaContainerTwo}>
                        {
                         mediaPreviewList.map((item: PreviewFiles, index: number) => {
                            return (
                                <div className={styles.mediaItemContainer} key={index}>
                                    <img src={item.url} alt="preview image" className={styles.mediaItemTwo}/>
                                </div>
                            )
                         })
                        }
                    </div>}
                    {mediaPreview && mediaPreviewList.length === 3 && <div className={styles.mediaContainer}>
                        <div className={styles.mediaContainerLeft}>
                            <div className={styles.mediaItemContainerLeft}>
                                <img src={mediaPreviewList[0].url} alt="preview image" className={styles.mediaItemLeft}/>
                            </div>
                        </div>
                        <div className={styles.mediaContainerRight}>
                            <div className={styles.mediaItemContainerRight}>
                                <img src={mediaPreviewList[1].url} alt="preview image" className={styles.mediaItemRight}/>
                            </div>
                            <div className={styles.mediaItemContainerRight}>
                                <img src={mediaPreviewList[2].url} alt="preview image" className={styles.mediaItemRight}/>
                            </div>
                        </div>
    
                    </div>}
                    {mediaPreview && mediaPreviewList.length === 4 && <div className={styles.mediaContainer}>
                        <div className={styles.mediaContainerStack}>
                            <div className={styles.mediaItemContainerRight}>
                                <img src={mediaPreviewList[0].url} alt="preview image" className={styles.mediaItemRight}/>
                            </div>
                            <div className={styles.mediaItemContainerRight}>
                                <img src={mediaPreviewList[1].url} alt="preview image" className={styles.mediaItemRight}/>
                            </div>
                        </div>
                        <div className={styles.mediaContainerStack}>
                            <div className={styles.mediaItemContainerRight}>
                                <img src={mediaPreviewList[2].url} alt="preview image" className={styles.mediaItemRight}/>
                            </div>
                            <div className={styles.mediaItemContainerRight}>
                                <img src={mediaPreviewList[3].url} alt="preview image" className={styles.mediaItemRight}/>
                            </div>
                        </div>
    
                    </div>}

                </div>
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
                    <button type="submit" className={styles[`${submitStyle}`]}
                        disabled={disabled}
                    >{!loading ? "Share" : <div className={styles.flashContainer}>
                        <div className={styles.shareText}>Sharing</div>
                        <div className={styles.snippet} data-title="dot-flashing">
                            <div className={styles.stage}>
                                <div className={styles.dotFlashing}></div>
                            </div>
                        </div>
                    </div>}</button>
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
        </form>

            
        </div>
    )
}