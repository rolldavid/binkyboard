import { SquareProps } from "./types"
import styles from "./Square.module.css"

export default function({content}: {content: SquareProps}) {
    return (
        <div className={styles.container}>
            {content.note}
        </div>
    )
}