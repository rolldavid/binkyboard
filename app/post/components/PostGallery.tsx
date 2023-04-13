import { useEffect, useState, Dispatch, SetStateAction } from "react"
import Image from "next/image"
import prev from "../assets/prev.png"
import next from "../assets/next.png"
import close from "../assets/close.png"
import { GalleryItems } from "./types"
import styles from "./PostGallery.module.css"

export default function PostGallery ({setShowGallery, slugs, selectedItem}: {setShowGallery: Dispatch<SetStateAction<boolean>>, slugs: GalleryItems[], selectedItem: number}) {
    const [imageIndex, setImageIndex] = useState(selectedItem)
    
    useEffect(() => {
        const body = document.querySelector("body")
        if (body) {
            body.style.overflow = "hidden"
        }
        return () => {
            
            const body = document.querySelector("body")

            if (body) {
                body.style.overflow = "auto"
            }
        }
    }, [])

    return (
        <>
        {slugs.length === 1 && <div className={styles.container}>
            <div className={styles.galleryModule}>
                <div className={styles.closeContainer}>
                    <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                        <Image src={close} width={30} height={30} alt="close image gallery"/>
                    </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[0].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                    </div>
                </div>
            </div>
        </div>}
        {slugs.length === 2 && <div className={styles.container}>
            { imageIndex === 0 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                        <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                            <Image src={close} width={30} height={30} alt="close image gallery"/>
                        </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                        <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(1)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[0].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(1)}/>
                    </div>
                </div>
            </div>
            }
            { imageIndex === 1 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                        <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                            <Image src={close} width={30} height={30} alt="close image gallery"/>
                        </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                        <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(0)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[1].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(0)}/>
                    </div>
                </div>
            </div>
            }
        </div>}
        {slugs.length === 3 && <div className={styles.container}>
            { imageIndex === 0 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                        <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                            <Image src={close} width={30} height={30} alt="close image gallery"/>
                        </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(2)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[0].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(1)}/>
                    </div>
                </div>
            </div>
            }
            { imageIndex === 1 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                    <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                        <Image src={close} width={30} height={30} alt="close image gallery"/>
                    </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(0)}/>
                      
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[1].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                       
                       <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(2)}/>
                    </div>
                </div>
            </div>
            }
            { imageIndex === 2 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                    <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                        <Image src={close} width={30} height={30} alt="close image gallery"/>
                    </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(1)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[2].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(0)}/>
                    </div>
                </div>
            </div>
            }
        </div>}
        {slugs.length === 4 && <div className={styles.container}>
            { imageIndex === 0 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                        <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                            <Image src={close} width={30} height={30} alt="close image gallery"/>
                        </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(3)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[0].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(1)}/>
                    </div>
                </div>
            </div>
            }
            { imageIndex === 1 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                    <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                        <Image src={close} width={30} height={30} alt="close image gallery"/>
                    </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(0)}/>
                      
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[1].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                       
                       <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(2)}/>
                    </div>
                </div>
            </div>
            }
            { imageIndex === 2 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                    <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                        <Image src={close} width={30} height={30} alt="close image gallery"/>
                    </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(1)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[2].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(3)}/>
                    </div>
                </div>
            </div>
            }
             { imageIndex === 3 &&
            <div className={styles.galleryModule} >
                <div className={styles.closeContainer}>
                    <div className={styles.closeButton} onClick={() => setShowGallery(false)}>
                        <Image src={close} width={30} height={30} alt="close image gallery"/>
                    </div>
                </div>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryImageWrap}>
                    <Image 
                            src={prev}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.prevArrow}
                            onClick={() => setImageIndex(2)}/>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${slugs[3].slug}`} 
                            width={250} 
                            height={250} 
                            alt="gallery image"
                            className={styles.galleryImage}
                        />
                        <Image 
                            src={next}
                            width={30}
                            height={30}
                            alt="previous image"
                            className={styles.nextArrow}
                            onClick={() => setImageIndex(0)}/>
                    </div>
                </div>
            </div>
            }
        </div>}
        </>
    )   
}

