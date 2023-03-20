
import { Board } from "@prisma/client";
import BoardHome from "./components/BoardHome"
import prisma from "@/lib/prisma";
import styles from "@/styles/Board.module.css"
import Spinner from "@/lib/Spinner"

export async function generateStaticParams() {
    const boards = await prisma.board.findMany()
 
    return boards.map((board: Board) => ({
        id: board
        }));

  } 

export default function Page({params}: {params: { id: string }}) {

    const {id} = params;

    return (
        <BoardHome boardId={id}/>
    )


}

