
import { Analytics } from '@vercel/analytics/react'
import Footer from './footer/components/Footer'
import NavContainer from './nav/components/NavContainer'
import QueryProvider from '@/lib/QueryProvider'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Metadata } from 'next'
import styles from "@/styles/Home.module.css"
import "@/styles/globals.css"


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    
    <html lang="en">
      <head />
      <body>

          <UserProvider>
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
          </UserProvider>
          <Analytics />
          
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  title: "binkyboard",
  description: "A simple place to celebrate life's biggest moments",
  openGraph: {
    title: "binkyboard",
    description: "A simple place to celebrate life's biggest moments",
    url: `https://binkyboard.com`,
    images: [
      {
      url: `https://d3h42dhdxazsqn.cloudfront.net/ogbanner.png`,
      width: 1200,
      height: 675,
      alt: "binkyboard"
      }
    ],
    type: "website",
    locale: "en-US"
  },
}  