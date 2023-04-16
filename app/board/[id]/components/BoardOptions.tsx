"use client"

import Image from "next/image"
import axios from "axios"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { updateBoard, deleteBoard, getBoardOptions } from "@/lib/db-utils"
import edit from "../assets/edit.png"
import { Dispatch, SyntheticEvent, useEffect, useState, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "@/lib/Spinner"
import styles from "./BoardOptions.module.css"


const schema = yup
.object({
  access: yup.string().required()

})
.required();


export default function BoardOptions({boardId, setShowOptions, accessList, privacy, registryLink, headerUrl, name}: {boardId: string, setShowOptions: Dispatch<SetStateAction<boolean>>, accessList: string, privacy: "ONE" | "TWO" | "THREE", registryLink: string, headerUrl: string, name: string }) {

    const [boardName, setBoardName] = useState(name)
    const [bannerChanged, setBannerChanged] = useState(false)
    const [chosenFile, setChosenFile] = useState<File>()
    const [allowList, setAllowList] = useState(accessList)
    const [access, setAccess] = useState(privacy)
    const [registry, setRegistry] = useState(registryLink)
    const [preview, setPreview] = useState(`${process.env.NEXT_PUBLIC_AWS_URL}/${headerUrl}`)
    const [loading, setLoading] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false)


    const router = useRouter()

    const queryClient = useQueryClient()

   
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

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

        let bannerUrl = headerUrl
       
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
        await updateBoard(boardId, bannerUrl, boardName, registry, access, allowList)


        setLoading(false)
        window.scrollTo({
            top: 0,
            left: 0
          });
        queryClient.invalidateQueries(["board"])
        setShowOptions(false)
    }

    const handleDelete = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await deleteBoard(boardId)
        router.push("/")
        
    }

    
       return  (
            <div className={styles.optionsOuter}>
                <div className={styles.optionsContainer}>
                    {!loading && <form className={styles.nameContainer}>
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
                                        width={30}
                                        height={30}
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
                            placeholder={registry && registry.length > 0 ? registry : "Registry link"}
                        />
                        
                        <div className={styles.accessButtonContainer}>
                            <label htmlFor="public" className={styles.accessButton}>
                                <input
                                    {...register("access")}
                                    type="radio"
                                    value="public"
                                    id="public"
                                    checked={access === "ONE" ? true : false}
                                    onChange={() => setAccess("ONE")}
                                />
                                <span className={styles.accessLabel}>Public - anyone with the link can access <em>{`(recommended)`}</em></span>
                            </label>
                            <label htmlFor="private" className={styles.accessButton}>
                                <input
                                    {...register("access")}
                                    type="radio"
                                    value="private"
                                    id="private"
                                    checked={access === "TWO" ? true : false}
                                    onChange={() => setAccess("TWO")}
                                    
                                />
                                <span className={styles.accessLabel}>Private - only allowed emails can access</span>
                            </label>
                        </div>
                        {access === "TWO" && <div className={styles.accessContainer}>
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
                            <div className={styles.saveButton} onClick={handleUpdate}>
                                Save
                            </div>
                            <div className={styles.cancelButton} onClick={() => setShowOptions(false)}>
                                Cancel
                            </div>
                        </div>
                        {!deleteButton && <p className={styles.deletePromptContainer}>Ready to leave it behind? <span className={styles.deletePrompt} onClick={() => setDeleteButton(prev => !prev)}>Delete this board.</span></p>}
                        {deleteButton &&
                            <div className={styles.deleteContainer}>
                                <p className={styles.deleteNote}>Deleting will permanently delete this board and all posts, forever.</p>
                                <div className={styles.deleteButton} onClick={e => handleDelete(e)}>
                                    Yes, delete the board
                                </div>
                                <div className={styles.cancelButton} onClick={() => setDeleteButton(false)}>Nevermind</div>
                            </div>
                        }
                    </form>}
                    {loading && 
                    <div className={styles.loadingContainer}>
                        <Spinner />
                      
                    </div>
                    }
                </div>
            </div>
        ) 
   
}