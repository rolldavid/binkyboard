"use client"

import { useQuery } from "@tanstack/react-query";
import { getBoard } from "@/lib/db-utils";
import AuthContainer from "@/app/auth/components/AuthContainer";
import Spinner from "@/lib/Spinner"
import CreatePost from "./components/CreatePost"
import BoardHeader from './components/BoardHeader';
import Collection from '@/app/post/components/Collection';
import styles from "@/styles/Board.module.css"
import { useState } from "react";
import BoardOptions from "./components/BoardOptions";

export default function Page({params: {id}}: {params: { id: string }}) {
    const [showOptions, setShowOptions] = useState(false)
    const {data, status} = useQuery(["board"], () => {
        return getBoard(id)
      })

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success" && !data.session) {
        return (
            <div className={styles.authContainer}>
                <AuthContainer />
            </div>
        )
    }

    if (status === "success" && data.board) {
        if (data.isOwner) {
            return (
                <div className={styles.container}>
                    {!showOptions && <>
                        <BoardHeader boardId={data.board.id} isOwner={true} setShowOptions={setShowOptions}/>
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
                    <BoardHeader boardId={data.board.id} isOwner={false} setShowOptions={setShowOptions}/>
                    <CreatePost boardId={data.board.id}/>
                    <Collection boardId={data.board.id} isOwner={false}/>
                </div>
            )
        }

        if (data.board.privacy === "TWO" && !data.hasAccess) {
            return (
                <div className={styles.container}>
                    You do not have access
                </div>
            )
        }


        return (
            <div className={styles.container}>
                <BoardHeader boardId={data.board.id} isOwner={false} setShowOptions={setShowOptions}/>
                <CreatePost boardId={data.board.id}/>
                <Collection boardId={data.board.id} isOwner={false}/>
            </div>
        )

    }

    return null;
}

// http://localhost:3000/board/clficutkh000enes4ptwl89wl