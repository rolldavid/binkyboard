import styles from "@/styles/Board.module.css"
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <div className={styles.outerContainer}>{children}</div>
    );
  }


  export async function generateMetadata({params: {id}}: {params: { id: string }}) {

    return {
        title: "binkyboard",
        description: "A simple place to celebrate life's biggest moments",
        openGraph: {
            title: "Join David on binkyboard!",
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
    };
  }