"use client"

import type { Board } from "@prisma/client"
import { getUserBoards } from "@/lib/db-utils"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import Spinner from "@/lib/Spinner"
import BoardCard from "@/app/board/[id]/components/BoardCard"
import styles from './Landing.module.css'
import { useEffect, useState } from "react"



export default function Page() {

  const router = useRouter()
  const queryClient = useQueryClient()

  const { data, status } = useQuery(["userBoards"], () => {
   
    return getUserBoards()
  });

  if (status === "loading") {
      return <Spinner />
  }


  if (status === "success" && data && data.boards) {
    queryClient.invalidateQueries(["collection"])

    if (data.role === "ADMIN" || data.role === "SUPER") {
      return (
        <div className={styles.container}>

          {data.boards.length > 0 ? <div className={styles.boardContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.titleText}>Your Boards</h2>
            </div>
              {
                data.boards.map((board: Board, index: number) => {
                  return (
                    <Link href={`/board/${board.id}`} key={index} className={styles.boardItem}>
                        <BoardCard board={board}/>
                    </Link>
                  )
                })
              }
            </div> :
            <div className={styles.noBoardContainer}>
                <p className={styles.noBoardText}>You don&apos;t have any boards yet 😢</p>
                <div className={styles.createButton} onClick={() => router.push("create")}>
                  Create a Board        
                </div>
            </div>
          }

        </div>
      )
    }  

   

    if (data.role === "USER") {
      return (
        <div className={styles.container}>

          {data.boards.length > 0 ? <div className={styles.boardContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.titleText}>Your Boards</h2>
            </div>
              {
                data.boards.map((board: Board, index: number) => {
                  return (
                    <Link href={`/board/${board.id}`} key={index} className={styles.boardItem}>
                        <BoardCard board={board}/>
                    </Link>
                  )
                })
              }
            </div> :
            <div className={styles.noBoardContainer}>
                <p className={styles.noBoardText}>You don&apos;t have any boards yet 😢</p>
            </div>
          }

        </div>
      )
    }
  }

  return (
    <div className={styles.noBoardContainer}>
        <p className={styles.noBoardText}>You don&apos;t have any boards yet 😢</p>
    </div>
  )

    
}
