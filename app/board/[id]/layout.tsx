import styles from "@/styles/Board.module.css"
import prisma from "@/lib/prisma";
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <div className={styles.outerContainer}>{children}</div>
    );
  }

  export async function generateMetadata({params: {id}}: {params: { id: string }}) {
    const boardName = await prisma.board.findUnique({where: {id}})
    return {
        title: "binkyboard",
        description: "A simple place to celebrate life's biggest moments",
        openGraph: {
            title: `You're invited to join ${boardName?.name}`,
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
    };
  }