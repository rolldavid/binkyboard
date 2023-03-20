"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect, SyntheticEvent, Dispatch, SetStateAction } from "react"
import { deletePost } from "@/lib/db-utils"
import styles from "./PostOptions.module.css"

export default function PostOptions({setShowOptions, boardId, postId}: {setShowOptions: Dispatch<SetStateAction<boolean>>, boardId: string, postId: number}) {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const queryClient = useQueryClient()

    useEffect(() => {
        const body = document.querySelector("body")
        if (body) {
            body.style.overflow = "hidden"
        }
        return () => {
            
            const body = document.querySelector("body")

            if (body) {
                body.style.overflow = "auto"
            }
        }
    }, [])

    const { mutateAsync } = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['collection'])
            setDeleting(false)
            window.scrollTo({
                top: 0,
                left: 0
              });
            setShowOptions(false)
          },
    });
  
    const preDelete = async (e: SyntheticEvent) => {
        e.preventDefault()
        setDeleting(true)
        mutateAsync({boardId, postId})
    }


    return (
        <div className={styles.container}>
            <div className={styles.optionsModule}>
                
                <button className={styles.pinButton} >
                    Pin Post
                </button>
                {!confirmDelete && <button className={styles.deleteButton} onClick={() => setConfirmDelete(true)}>
                    Delete Post
                </button>}
                {confirmDelete && <button className={styles.deleteButton} onClick={preDelete}>
                    {deleting ? `Deleting...` : `Yes, delete this post`}
                </button>}
                <button className={styles.cancelButton} onClick={() => setShowOptions(false)}>
                    Cancel
                </button>
                    
            </div>
        </div>
    )
}