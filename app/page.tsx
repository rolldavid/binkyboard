"use client"

import { Board } from "@prisma/client"
import { getUserSession } from "@/lib/db-utils"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import Spinner from "@/lib/Spinner"
import BoardCard from "./[board]/components/BoardCard"
import styles from '@/styles/Home.module.css'
import ScrollToTop from "@/lib/ScrollToTop"

export default function Page() {
  const router = useRouter()

  const { data, status } = useQuery(["user"], () => {
    return getUserSession()
  });

  if (status === "loading") {
      return <Spinner />
  }

  if (data && data.boards && status === "success") {
      return (
        <>
        <main className={styles.container}>
          {data.boards.length > 0 ? <div className={styles.boardContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.titleText}>Your Boards</h2>
            </div>
              {
                data.boards.map((board: Board, index: number) => {
                  return (
                    <Link href={`/${board.id}`} key={index} className={styles.boardItem}>
                        <BoardCard board={board}/>
                    </Link>
                  )
                })
              }
              </div> :
              <div className={styles.noBoardContainer}>
                  <p className={styles.noBoardText}>You don&apos;t have any boards yet 😢</p>
                  <button className={styles.createButton} onClick={() => router.push("create")}>
                    Create a Board        
                  </button>
              </div>
          
          }
        </main>
        <ScrollToTop />
        </>
      )
    }
}
