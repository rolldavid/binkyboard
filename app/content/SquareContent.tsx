import { SquareProps } from "./types"
import styles from "./SquareContent.module.css"

export default function({content}: {content: SquareProps}) {
    return (
        <div className={styles.container}>
            <div className={styles.noteContainer}>  
                <p className={styles.note}>
                    {content.note}
                </p>
                <p className={styles.note}>
                    {content.author}
                </p>
            </div>
            
        </div>
    )
}