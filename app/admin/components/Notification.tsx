"use client"

import { SyntheticEvent, useState } from "react"
import { createNotification } from "@/lib/db-utils"
import styles from "./Notification.module.css"

export default function Notification() {
    const [message, setMessage] = useState("")
    const [description, setDescription] = useState("")

    const handleNotification = async (e: SyntheticEvent) => {
        e.preventDefault()
        const add = await createNotification(message, description)
    }

    return (
        
        <div className={styles.container}>
            <form>
           
                <input 
                    name="message"
                    value={message} 
                    className={styles.searchbar}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Create a notification..."
                />
                <input 
                    name="description"
                    value={description} 
                    className={styles.searchbar}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button onClick={handleNotification}>Create</button>
             </form>
            
        </div>
        
    
)

}