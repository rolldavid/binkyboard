
import Head from 'next/head'
import Footer from './footer/components/Footer'
import NavContainer from './nav/components/NavContainer'
import QueryProvider from '@/lib/QueryProvider'
import styles from "@/styles/Home.module.css"

import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <title>binkyboard</title>
        <meta property="description" content="A simple place to celebrate life's biggest moments"/>
      </head>
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

