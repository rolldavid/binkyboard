"use client"

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getBoard, removeBoard, sendAccessEmail } from "@/lib/db-utils";
import Spinner from "@/lib/Spinner"
import CreatePost from "./CreatePost"
import BoardHeader from './BoardHeader';
import Collection from '@/app/post/components/Collection';
import styles from "@/styles/Board.module.css"
import { SyntheticEvent, useEffect, useState } from "react";
import BoardOptions from "./BoardOptions";


export default function Page({boardId}: {boardId: string}) {
    const [showOptions, setShowOptions] = useState(false)

    const router = useRouter()

    const {data, status} = useQuery(["board"], () => {
        return getBoard(boardId)
      })

    useEffect(() => {
        localStorage.setItem("invite", boardId)
    }, [])

    const handleAccess = async (e: SyntheticEvent) => {
        e.preventDefault()
        await sendAccessEmail(data.board.id)
    }

    const handleRemove = async (e:SyntheticEvent) => {
        e.preventDefault()
        await removeBoard(data.board.id)
        router.push("/")
    }

    if (status === "loading") {
        return (
            <div className={styles.container}>
                <Spinner />
            </div>
        )
    }

    if ( status === "success" && data.board) {
        
        if (data.isOwner) {
           
            return (
                <div className={styles.container}>
                    {!showOptions && <>
                        <BoardHeader boardId={boardId} isOwner={true} setShowOptions={setShowOptions} headerUrl={data.board.headerUrl} boardName={data.board.name} registry={data.board.registry}/>
                        <CreatePost boardId={boardId}/>
                        <Collection boardId={boardId} isOwner={true} />
                    </>}
                    {showOptions && <BoardOptions boardId={boardId} accessList={data.board.allowList} setShowOptions={setShowOptions} privacy={data.board.privacy} headerUrl={data.board.headerUrl} name={data.board.name} registryLink={data.board.registry}/>}
                </div>
            )
        
        }
        if (data.board.privacy === "TWO" && data.hasAccess) {
            return (
                <div className={styles.container}>
                    <BoardHeader boardId={boardId} isOwner={false} setShowOptions={setShowOptions} headerUrl={data.board.headerUrl} boardName={data.board.name} registry={data.board.registry}/>
                    <CreatePost boardId={boardId}/>
                    <Collection boardId={boardId} isOwner={false} />
                </div>
            )
        }

        if (data.board.privacy === "TWO" && !data.hasAccess) {
            return (
                <div className={styles.container}>
                    <div className={styles.accessContainer}>
                        <p className={styles.accessTitle}>The owner has made this board private.</p>
                        <div className={styles.updateContainer}>
                            <div className={styles.requestButton} onClick={handleAccess}>
                                Request Access
                            </div>
                            <div className={styles.deleteButton} onClick={handleRemove}>
                                Remove
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div className={styles.container}>
                <BoardHeader boardId={boardId} isOwner={false} setShowOptions={setShowOptions} headerUrl={data.board.headerUrl} boardName={data.board.name} registry={data.board.registry}/>
                <CreatePost boardId={boardId}/>
                <Collection boardId={boardId} isOwner={false} />
            </div>
        )

    }

    return null;
}
