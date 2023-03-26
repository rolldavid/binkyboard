"use client"

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getBoard, removeBoard, sendAccessEmail } from "@/lib/db-utils";
import AuthContainer from "@/app/auth/components/AuthContainer";
import Spinner from "@/lib/Spinner"
import CreatePost from "./components/CreatePost"
import BoardHeader from './components/BoardHeader';
import Collection from '@/app/post/components/Collection';
import styles from "@/styles/Board.module.css"
import { SyntheticEvent, useEffect, useState } from "react";
import BoardOptions from "./components/BoardOptions";

export default function Page({params: {id}}: {params: { id: string }}) {
    const [showOptions, setShowOptions] = useState(false)

    const router = useRouter()
    const {isLoading, user, error} = useUser()

    const {data, status} = useQuery(["board"], () => {
        return getBoard(id)
      })

    useEffect(() => {
        localStorage.setItem("invite", id)
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

    if (isLoading) {
        return <Spinner />
    }

    if (!isLoading && (!user || error)) {
        return (
            <div className={styles.authContainer}>
                <AuthContainer />
            </div>
        )
    }

    if (!isLoading && user && status === "success" && data.board) {
        if (data.isOwner) {
            return (
                <div className={styles.container}>
                    {!showOptions && <>
                        <BoardHeader boardId={data.board.id} isOwner={true} setShowOptions={setShowOptions} headerUrl={data.board.headerUrl} boardName={data.board.name} registry={data.board.registry}/>
                        <CreatePost boardId={data.board.id}/>
                        <Collection boardId={data.board.id} isOwner={true}/>
                    </>}
                    {showOptions && <BoardOptions boardId={id} accessList={data.board.allowList} setShowOptions={setShowOptions} privacy={data.board.privacy} headerUrl={data.board.headerUrl} name={data.board.name} registryLink={data.board.registry}/>}
                </div>
            )
        
        }
        if (data.board.privacy === "TWO" && data.hasAccess) {
            return (
                <div className={styles.container}>
                    <BoardHeader boardId={data.board.id} isOwner={true} setShowOptions={setShowOptions} headerUrl={data.board.headerUrl} boardName={data.board.name} registry={data.board.registry}/>
                    <CreatePost boardId={data.board.id}/>
                    <Collection boardId={data.board.id} isOwner={false}/>
                </div>
            )
        }

        if (data.board.privacy === "TWO" && !data.hasAccess) {
            return (
                <div className={styles.container}>
                    <div className={styles.accessContainer}>
                        <p className={styles.accessTitle}>The owner has made this board private.</p>
                        <div className={styles.updateContainer}>
                            <button className={styles.requestButton} onClick={handleAccess}>
                                Request Access
                            </button>
                            <button className={styles.deleteButton} onClick={handleRemove}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div className={styles.container}>
                <BoardHeader boardId={data.board.id} isOwner={false} setShowOptions={setShowOptions} headerUrl={data.board.headerUrl} boardName={data.board.name} registry={data.board.registry}/>
                <CreatePost boardId={data.board.id}/>
                <Collection boardId={data.board.id} isOwner={false}/>
            </div>
        )

    }

    return null;
}

// http://localhost:3000/board/clficutkh000enes4ptwl89wl