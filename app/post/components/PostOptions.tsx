"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect, SyntheticEvent, Dispatch, SetStateAction } from "react"
import { deletePost, pinPost } from "@/lib/db-utils"
import styles from "./PostOptions.module.css"

export default function PostOptions({setShowOptions, boardId, postId, isAdmin}: {setShowOptions: Dispatch<SetStateAction<boolean>>, boardId: string, postId: number, isAdmin: boolean}) {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [confirmPin, setConfirmPin] = useState(false)
    const [pinning, setPinning] = useState(false)

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

    const { mutateAsync: mutateDelete } = useMutation(deletePost, {
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

    const { mutateAsync: mutatePin } = useMutation(pinPost, {
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
        mutateDelete({boardId, postId})
    }

    const prePin = async (e: SyntheticEvent) => {
        e.preventDefault()
        setPinning(true)
        mutatePin({boardId, postId})
        
    }


    return (
        <div className={styles.container}>
            <div className={styles.optionsModule}>
                
                {isAdmin && !confirmPin && <div className={styles.pinButton} onClick={() => setConfirmPin(true)}>
                    Pin Post
                </div>}
                {isAdmin && confirmPin && <div className={styles.pinButton} onClick={prePin}>
                    {pinning ? `Pinning...` : `Yes, pin this post`}
                </div>}
               
                {!confirmDelete && <div className={styles.deleteButton} onClick={() => setConfirmDelete(true)}>
                    Delete Post
                </div>}
                {confirmDelete && <div className={styles.deleteButton} onClick={preDelete}>
                    {deleting ? `Deleting...` : `Yes, delete this post`}
                </div>}
                <div className={styles.cancelButton} onClick={() => setShowOptions(false)}>
                    Cancel
                </div>
                    
            </div>
        </div>
    )
}