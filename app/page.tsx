import type { Metadata } from 'next'
import Landing from "./home/components/Landing"

export default function Page() {
  return <Landing />
}

export const metadata: Metadata = {
  title: "binkyboard",
  description: "A simple place to celebrate life's biggest moments",
  
}
