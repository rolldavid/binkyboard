

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

