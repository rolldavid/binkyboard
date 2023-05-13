import Image from "next/image"
import logo from "../../nav/assets/logo.png"
import styles from "./Footer.module.css" 

export default function Footer(){
    return (
    
        <section className={styles.container}>
            <div className={styles.logoContainer}>
            <Image 
                    src={logo}
                    width={125}
                    height={38}
                    alt="binkyboard logo"
                    className={styles.logo}
                    priority
                />
            </div>
        </section>
        
    
    )
}

