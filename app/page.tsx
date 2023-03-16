"use client"

import { getUserSession } from "@/lib/db-utils"
import { Board } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import Spinner from "@/lib/Spinner"
import AuthContainer from "./auth/components/AuthContainer"
import Collection from './post/components/Collection'
import CreatePost from './post/components/CreatePost'
import BoardCard from "./[board]/components/BoardCard"
import styles from '@/styles/Home.module.css'

export default function Page() {
  const { data, status } = useQuery(["user"], () => {
    return getUserSession()
  });

  if (status === "loading") {
      return <Spinner />
  }


  if (data && data.boards) {
      return (
        <main className={styles.container}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleText}>Your Boards</h2>
          </div>
          {data.boards.length > 0 ? <div className={styles.boardContainer}>

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
                  <p className={styles.noBoardText}>Looks like you are don&apos;t have any boards yet.</p>
              </div>
          
          }
        </main>
      )
    }
}
