import Collection from './content/Collection'
import Submit from './content/Submit'
import styles from './page.module.css'

export default async function Page() {
  return (
    <main >
      <Submit />
      <Collection />
    </main>
  )
}
