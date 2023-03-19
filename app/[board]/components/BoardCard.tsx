
import type { Board } from "@prisma/client"
import styles from "./BoardCard.module.css"

export default function BoardCard ({board}: {board: Board}) {
    return (
        <div className={styles.container}>
           
                <h3 className={styles.boardTitle}>{board.name}</h3>
            
            
        </div>
    )
}