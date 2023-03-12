
import CreateBoard from "./components/CreateBoard"
import styles from "@/styles/Create.module.css"

export default function Page({params: {board}}: {params: { board: string }}) {
    return (
        <div className={styles.container}>
            <CreateBoard />
        </div>
    )
}