"use client"

import { SyntheticEvent, useState } from "react"
import styles from "./Submit.module.css"

export default function Submit() {
    const [note, setNote] = useState("")
    const [author, setAuthor] = useState("")

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log()
    }
    return (
        <section className={styles.container}>
            <form onSubmit={(e: SyntheticEvent) => handleSubmit(e)} className={styles.formContainer}>
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