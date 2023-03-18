import type { Metadata } from 'next'
import Landing from "./home/components/Landing"

export default function Page() {
  return <Landing />
}

/* export const metadata: Metadata = {
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
} */
