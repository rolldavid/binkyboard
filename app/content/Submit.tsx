"use client"

import axios from "axios";
import { SyntheticEvent, useState, useEffect, ClipboardEvent, useReducer, KeyboardEvent } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import styles from "./Submit.module.css"
import ReactPlayer from "react-player"
import img from "./assets/img.png"
import mov from "./assets/mov.png"

let linkInput = false;
let mediaInput = false;
let holdLink = ""
let linkChecked = false;
let mediaCounter = 0;

interface PreviewFiles {
    url: string
    type: string
}

export default function Submit() {
    const [note, setNote] = useState("")
    const [mediaCount, setMediaCount] = useState(0)
    const [linkPreview, setLinkPreview] = useState(false)
    const [toggleLink, setToggleLink] = useState(false)
    const [mediaPreview, setMediaPreview] = useState(false)
    const [mediaList, setMediaList] = useState<PreviewFiles[]>([])
    const [rowCount, setRowCount] = useState(2)
    const [mediaClass, setMediaClass] = useState("")
    const [mediaDetailClass, setMediaDetailClass] = useState("")
    
    const [link, setLink] = useState("")
    
    const [selectedMedia, setSelectedMedia] = useState<FileList | null>(null);


    const queryClient = useQueryClient()

    async function addSquare({note}: {note: string}) {
        console.log(selectedMedia)


        if (selectedMedia) {
           
           
            const { data } = await axios.post(
                "/api/get-s3-url",
                {
                    filename: selectedMedia[0].name,
                    fileType: selectedMedia[0].type
                }
            )

            const url = data.url

            console.log("url.........", url)

            await axios.put(url, selectedMedia[0], {
                headers: {
                  "Content-Type": selectedMedia[0].type,
                  "Access-Control-Allow-Origin": "*",
                },
              });
            
        }
        setNote("")
        setSelectedMedia(null)
     
    }

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

        const selectedFiles = e.target.files;
        
        if (!selectedFiles) {
            return;
        }

        console.log(selectedFiles[0])
        if (selectedFiles.length >= 4 || mediaCount >= 4) {
            console.log("Select up to 4 files");
            return;
        }

        setSelectedMedia(selectedFiles)

        mediaCounter += selectedFiles.length;
        
        for (let i = 0; i < selectedFiles.length; i++) {
            
            let reader = new FileReader()
            

            if (selectedFiles[i].type.includes("mov")) {

                reader.onload = e => {
                    let blobData = reader.result;
                    console.log(blobData);
               };

                reader.onloadend = () => {
                    setMediaList([...mediaList, {url: reader.result as string, type: selectedFiles[i].type}])
                    setMediaPreview(true)
                    
                  };
                  reader.readAsDataURL(selectedFiles[i])
            } else {
                reader.onloadend = () => {
                    setMediaList([...mediaList, {url: reader.result as string, type: selectedFiles[i].type}])
                    setMediaPreview(true)
                  };
                reader.readAsDataURL(selectedFiles[i])
            }

            
        }
        console.log(mediaCounter, "==========")
        setMediaCount(mediaCounter)
        
    }

 
    useEffect(() => {
        if (mediaCount === 1) {
            setLinkPreview(false)
            setMediaClass("mediaClassOne")
            setMediaDetailClass("mediaDetailOne")
            console.log("one ==============")
        } else if (mediaCount === 2) {
            setMediaClass("mediaClassTwo")
            setMediaDetailClass("mediaDetailTwo")
            console.log("two ==============")
        } else if (mediaCount === 3) {
            setMediaDetailClass("mediaDetailThree")
            setMediaClass("mediaClassThree")
            console.log("three ==============")
        } else if (mediaCount === 4) {
            setMediaDetailClass("mediaDetailFour")
            setMediaClass("mediaClassFour")
            console.log("four ==============")
        }

        if (mediaCount < 1) {
            if (link.length > 0 && linkChecked) {
                setLinkPreview(true)
                setMediaPreview(false)
            } else {
                setMediaPreview(false)
            }
        }
    }, [mediaCount])


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

  

    const { mutateAsync } = useMutation(addSquare, {
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
                <section className={styles.previewSection}>
                    {linkPreview && <div className={styles.videoPreviewContainer}>
                            <ReactPlayer url={link} controls={true} width="100%" onError={() => setLinkPreview(false)}/>
                    </div>}
                    
                    {mediaPreview && <div className={styles.mediaContainer}>
                        {
                            mediaList.map((item, index) => {
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
                    </div>}
                   
                </section>
              </div>
                    
              
               
                <div className={styles.postActions}>
                    <div className={styles.uploadContainer}>
                        <label htmlFor="upload" className={styles.uploadItem}>
                            <Image src={img} width={27} height={25} alt="image icon"/>
                        </label>
                        <label htmlFor="upload" className={styles.uploadItem}>
                            <Image src={mov} width={35} height={25} alt="movie icon"/>
                        </label>
                    </div>
                    <button type="submit" className={styles.submitButton}>Share</button>
                </div>
                <div className={styles.uploadHidden}>
                    <input 
                        id="upload"
                        className={styles.uploadItem} 
                        multiple
                        type="file" 
                        accept="image/png, image/jpeg, audio/*, video/*, image/*"
                        onChange={handleUpload}
                        hidden
                        />    
                </div>
            </form>
        </section>
    )
}