
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
      <head></head>
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
    url: `https://binkyboard.com`,
    images: [
      {
      url: `https://d3h42dhdxazsqn.cloudfront.net/yPwbiLyA-e_APVJ1vI6MS.png`,
      width: 1200,
      height: 675,
      alt: "binkyboard"
      }
    ],
    type: "website",
    locale: "en-US"
  },
}
