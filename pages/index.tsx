import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.description}>
          Get started by selecting a learning mode below
        </p>

        <div className={styles.grid}>
          <Link href="/hiragana/">
            <a className={styles.card}>
              <h3>Hiragana Test &rarr;</h3>
              <p>Test your Hiragana characters knowledge by choosing a correct pronunciation</p>
            </a>
          </Link>

        </div>
      </main>
    </div>
  )
}
