import styles from "@/styles/Board.module.css"
import prisma from "@/lib/prisma";
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <>{children}</>
    );
  }

 