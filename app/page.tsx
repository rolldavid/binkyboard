import Collection from './content/Collection'
import Submit from './content/Submit'
import Title from './content/Title'
import styles from './page.module.css'

export default async function Page() {
  return (
    <main >
      <Title />
      <Submit />
      <Collection />

    </main>
  )
}
