import { SquareProps } from "./types"

import Square from "./Square"
import styles from "./Collection.module.css"



const squares: SquareProps[] = [
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    },
    {
        author: "Johnny",
        type: "note",
        note: "hey there, woooo"
    }
]

export default function Collection() {
    return (
        <div className={styles.container}>
            {
                squares.map((square, index) => {
                    return (
                        <Square key={index} content={square}/>
                    )
                })
            }
        </div>
    )
}