
import Footer from './footer/components/Footer'
import NavContainer from './nav/components/NavContainer'
import QueryProvider from '@/lib/QueryProvider'
import styles from "@/styles/Home.module.css"

import AuthContainer from "./auth/components/AuthContainer"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <QueryProvider>
          <nav className={styles.nav}>
              <NavContainer/>
          </nav>
          <main className={styles.main}>
            {children}
          </main> 
          <footer className={styles.footer}>
              <Footer />
          </footer>
        </QueryProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: "binkyboard",
  description: "A simple place to celebrate life's biggest moments",
  openGraph: {
    title: "binkyboard",
    description: "A simple place to celebrate life's biggest moments",
    url: `https://binkyboard.com/`,
    images: [
      {
      url: `https://d3h42dhdxazsqn.cloudfront.net/yPwbiLyA-e_APVJ1vI6MS.png`,
      width: 1200,
      height: 675
      }
    ],
    type: "website",
    locale: "en-US"
  }
}
