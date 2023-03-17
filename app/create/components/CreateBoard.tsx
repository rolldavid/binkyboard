"use client"

import Link from "next/link";
import { useState, useEffect, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "@/lib/Spinner";
import { createNewBoard } from "@/lib/db-utils";
import styles from "./CreateBoard.module.css"


const schema = yup
.object({
  name: yup.string().min(5).required(),
  registry: yup.string(),
  access: yup.string().required()

})
.required();



export default function CreateBoard() {
    const [boardName, setBoardName] = useState("")
    const [registry, setRegistry] = useState("")
    const [access, setAccess] = useState(true)
    const [accessList, setAccessList] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [boardLink, setBoardLink] = useState("binkyboard.com/3839844739")
    const [copyText, setCopyText] = useState("Copy board link")

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const router = useRouter()

    const createBoard = async () => {
        setLoading(true)
    
        const board = await createNewBoard(boardName, access, registry, accessList)

        if (board && board.status === "ok") {
            setSubmitted(true)
            setBoardLink(board.link)
        }
        
        setLoading(false)
    }

    const copyLink = (e: SyntheticEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${boardLink}`)
        setCopyText(`✓ Copied`)
    }
   
    return (
        <div className={styles.container}>
            
            {!loading && !submitted && <form onSubmit={handleSubmit(createBoard)} className={styles.formContainer}>
                <div className={styles.titleContainer}>
                    <h2>Create a Board</h2>
                </div>
                
                <input 
                    {...register("name")}
                    type="text"
                    placeholder="Board name"
                    value={boardName}
                    onChange={e => setBoardName(e.target.value)}
                    className={styles.nameInput}
                />
                <input 
                    {...register("registry")}
                    type="text"
                    placeholder="Registry link (optional)"
                    value={registry}
                    onChange={e => setRegistry(e.target.value)}
                    className={styles.nameInput}
                />
                <div className={styles.accessButtonContainer}>
                    <label htmlFor="public" className={styles.accessButton}>
                        <input
                            {...register("access")}
                            type="radio"
                            value="public"
                            id="public"
                            onChange={() => setAccess(true)}
                            
                        />
                        <span className={styles.accessLabel}>Public - anyone with the link can access</span>
                    </label>
                    <label htmlFor="private" className={styles.accessButton}>
                        <input
                            {...register("access")}
                            type="radio"
                            value="private"
                            id="private"
                            onChange={() => setAccess(false)}
                            
                        />
                        <span className={styles.accessLabel}>Private - only allowed emails can access</span>
                    </label>
                </div>
                {!access && <div className={styles.accessContainer}>
                    
                    <input 
                        {...register("accessList")}
                        type="textarea"
                        value={accessList}
                        onChange={e => setAccessList(e.target.value)}
                        className={styles.accessInput}
                        placeholder="Enter emails, separated by commas"
                    />
                <p className={styles.accessText}>You can add more emails or make board public later in your board settings.</p>
                </div>
                }
                <div className={styles.submitContainer}>
                    <button className={styles.submitButton} type="submit">
                        Create
                    </button>
                </div>
            </form>}
            
            {!loading && submitted && <div className={styles.submittedContainer}>
                <div className={styles.boardLinkTitleContainer}>
                    <h2 className={styles.boardLinkTitle}>Share your board!</h2>
                </div>
                <button onClick={(e) => copyLink(e)} className={styles.copyLink}>
                    {copyText}
                </button>
                <button onClick={() => router.push(`/${boardLink}`)} className={styles.boardLink}>
                    Go to my board
                </button>
                
            </div>}
            {loading && <Spinner />}
        </div>
    )
}