"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect, SyntheticEvent, Dispatch, SetStateAction } from "react"
import { deletePost, pinPost, unpinPost } from "@/lib/db-utils"
import styles from "./PostOptions.module.css"

export default function PostOptions({setShowOptions, boardId, postId, isAdmin, isPinned}: {setShowOptions: Dispatch<SetStateAction<boolean>>, boardId: string, postId: number, isAdmin: boolean, isPinned: boolean}) {
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
            queryClient.invalidateQueries(['pinnedPost'])
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
            queryClient.invalidateQueries(['pinnedPost'])
            setDeleting(false)
            window.scrollTo({
                top: 0,
                left: 0
              });
            setShowOptions(false)
          },
    });

    const { mutateAsync: mutateUnpin } = useMutation(unpinPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['collection'])
            queryClient.invalidateQueries(['pinnedPost'])
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

    const preUnpin = async (e: SyntheticEvent) => {
        e.preventDefault()
        setPinning(true)
        mutateUnpin({boardId, postId})
    }


    return (
        <div className={styles.container}>
            <div className={styles.optionsModule}>
                
                {isAdmin && !confirmPin && !isPinned && <div className={styles.pinButton} onClick={() => setConfirmPin(true)}>
                    Pin Post
                </div>}
                {isAdmin && confirmPin && !isPinned && <div className={styles.pinButton} onClick={prePin}>
                    {pinning ? `Pinning...` : `Yes, pin this post`}
                </div>}
                {isAdmin && !confirmPin && isPinned && <div className={styles.pinButton} onClick={() => setConfirmPin(true)}>
                    Unpin Post
                </div>}
                {isAdmin && confirmPin && isPinned && <div className={styles.pinButton} onClick={preUnpin}>
                    {pinning ? `Unpinning...` : `Yes, unpin this post`}
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