"use client"

import Image from "next/image"
import axios from "axios"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { Board } from "@prisma/client"
import { updateBoard, deleteBoard } from "@/lib/db-utils"
import banner from "../assets/banner.png"
import edit from "../assets/editButton.png"
import { Dispatch, SyntheticEvent, useEffect, useState, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "@/lib/Spinner"
import ScrollToTop from "@/lib/ScrollToTop"
import styles from "./BoardOptions.module.css"


const schema = yup
.object({
  access: yup.string().required()

})
.required();


export default function BoardOptions({board, setShowOptions}: {board: Board, setShowOptions: Dispatch<SetStateAction<boolean>> }) {

    const [boardName, setBoardName] = useState("")
    const [bannerChanged, setBannerChanged] = useState(false)
    const [chosenFile, setChosenFile] = useState<File>()
    const [allowList, setAllowList] = useState("")
    const [access, setAccess] = useState(true)
    const [registry, setRegistry] = useState("gift")
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false)

    const queryClient = useQueryClient()

    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    useEffect(() => {
        setBoardName(board.name)
    
        if (board.allowList) {
            setAllowList(board.allowList)
        }
            
        if (board.public === false) {
            setAccess(false)
        } 

        if (board.registry) {
            setRegistry(board.registry)
        } else {
            setRegistry("")
        }
        
        setPreview(`${process.env.NEXT_PUBLIC_AWS_URL}/${board.headerUrl}`)
        
    }, [])


    const handleBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
    
        if (e.target.files && e.target.files[0]) {
            const userFile = e.target.files[0]
            setChosenFile(userFile)
            setBannerChanged(true)

            let reader = new FileReader()

             reader.onloadend = () => {
                setPreview(reader.result as string)
             };
             
            reader.readAsDataURL(e.target.files[0])
        }
    }   


    const handleUpdate = async (e:SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)

        let bannerUrl = board.headerUrl
       
        if (bannerChanged) {
            const s3id = nanoid()
           
            if (chosenFile) {
                const extensionIndex = chosenFile.name.lastIndexOf(".")
                const fileExtension = chosenFile.name.slice(extensionIndex)
                const { data: s3Data } = await axios.post(
                    "/api/get-s3-url",
                    {
                        filename: `${s3id}${fileExtension}`,
                        fileType: chosenFile.type
                    }
                )

                const s3Url = s3Data.url
            
                await axios.put(s3Url, chosenFile, {
                    headers: {
                        "Content-Type": chosenFile.type,
                        "Access-Control-Allow-Origin": "*",
                    },
                    });

                bannerUrl = `${s3id}${fileExtension}`
            
            }
        }
        await updateBoard(board.id, bannerUrl, boardName, registry, access, allowList)

        await queryClient.invalidateQueries(['board'])
        setLoading(false)
        setShowOptions(false)
    }

    const handleDelete = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await deleteBoard(board.id)
        console.log("made it back")
        router.push("/")
        
    }
    return  (
        <div className={styles.optionsOuter}>
            <div className={styles.optionsContainer}>
                {!loading && <div className={styles.nameContainer}>
                    <div className={styles.bannerWrapper}>
                        <Image 
                            src={preview}
                            width={600}
                            height={337}
                            alt="banner"
                            className={styles.banner}
                        
                        />
                    </div>
                    <div className={styles.editBannerContainer}>
                        <div className={styles.editButton}>
                            <label htmlFor="uploadBanner" className={styles.uploadItem}>
                                <Image 
                                    src={edit}
                                    width={45}
                                    height={45}
                                    alt="edit banner button"
                                    className={styles.editBanner}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.uploadHidden}>
                        <input 
                            id="uploadBanner"
                            className={styles.uploadItem} 
                            type="file" 
                            accept={"image/png, image/jpeg, image/*"}
                            onChange={handleBanner}
                            hidden
                        />    
                    </div>
                   
                    <input 
                        type="text"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        className={styles.nameInput}
                    />
                    <input 
                        type="text"
                        value={registry}
                        onChange={(e) => setRegistry(e.target.value)}
                        className={styles.nameInput}
                        placeholder={registry.length > 0 ? registry : "Registry link"}
                    />
                    
                    <div className={styles.accessButtonContainer}>
                        <label htmlFor="public" className={styles.accessButton}>
                            <input
                                {...register("access")}
                                type="radio"
                                value="public"
                                id="public"
                                checked={access ? true : false}
                                onChange={() => setAccess(true)}
                            />
                            <span className={styles.accessLabel}>Public - anyone with the link can access <em>{`(recommended)`}</em></span>
                        </label>
                        <label htmlFor="private" className={styles.accessButton}>
                            <input
                                {...register("access")}
                                type="radio"
                                value="private"
                                id="private"
                                checked={!access ? true : false}
                                onChange={() => setAccess(false)}
                                
                            />
                            <span className={styles.accessLabel}>Private - only allowed emails can access</span>
                        </label>
                    </div>
                    {!access && <div className={styles.accessContainer}>
                        <input 
                            {...register("accessList")}
                            type="textarea"
                            value={allowList}
                            onChange={e => setAllowList(e.target.value)}
                            className={styles.accessInput}
                            placeholder="Enter emails, separated by commas"
                        />
                    </div>
                    }

                    <div className={styles.saveContainer}>
                        <button className={styles.saveButton} onClick={handleUpdate}>
                            Save
                        </button>
                        <button className={styles.cancelButton} onClick={() => setShowOptions(false)}>
                            Cancel
                        </button>
                    </div>
                    {!deleteButton && <p className={styles.deletePromptContainer}>Ready to leave it behind? <span className={styles.deletePrompt} onClick={() => setDeleteButton(prev => !prev)}>Delete this board.</span></p>}
                    {deleteButton &&
                        <div className={styles.deleteContainer}>
                            <p className={styles.deleteNote}>Deleting will permanently delete this board and all posts, forever.</p>
                            <button className={styles.deleteButton} onClick={e => handleDelete(e)}>
                                Yes, delete the board
                            </button>
                            <button className={styles.cancelButton} onClick={() => setDeleteButton(false)}>Nevermind</button>
                        </div>
                    }
                </div>}
                {loading && 
                <div className={styles.loadingContainer}>
                    <Spinner />
                    <ScrollToTop />
                </div>
                }
            </div>
        </div>
    )
}