"use client"

import { SyntheticEvent, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import styles from "./Submit.module.css"

export default function Submit() {
    const [note, setNote] = useState("")
    const [author, setAuthor] = useState("")

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
                    placeholder="Add a note for Kelly & baby"
                />
                <input 
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className={styles.authorInput}
                    placeholder="Your name"
                />
                <div className={styles.uploadContainer}>
                    <p className={styles.uploadItem}>+Image</p>
                    <p className={styles.uploadItem}>+Video</p>
                    <p className={styles.uploadItem}>+Song</p>
                </div>
                
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </section>
    )
}