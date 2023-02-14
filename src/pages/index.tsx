import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>usagisözlük</title>
        <meta name="description" content="İyi olan her şey" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        usagisözlük

        <div>
          <h3>Başlıklar</h3>
        </div>
      </main>
    </>
  )
}
