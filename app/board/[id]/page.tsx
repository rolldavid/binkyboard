import { headers } from 'next/headers';
import { Board } from "@prisma/client";
import BoardHome from "./components/BoardHome"
import prisma from "@/lib/prisma";
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"



export default function Page({params}: {params: { id: string }}) {
    const headersList = headers();
    const {id} = params;

    return (
        <BoardHome boardId={id}/>
    )

}

export const dynamic = 'force-dynamic'