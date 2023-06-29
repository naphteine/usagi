import Head from "next/head";
import { ListResult } from "pocketbase";

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import DictEntry from "@/components/DictEntry";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pb from "../../lib/pocketbase";

export default function Home() {
  const [dictData, setDictData] = useState<ListResult>();

  async function getAll() {
    const resultList = await pb.collection("usagi_captions").getList(1, 50, {
      expand: "user",
      filter: "",
      $autoCancel: false,
      sort: "-created",
    });

    setDictData(resultList);
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Head>
        <title>usagisözlük</title>
        <meta name="description" content="Güzel olan her şeyin sözlüğü" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h2>gündem</h2>
        {dictData?.items?.map((e) => (
          <DictEntry key={e.id} data={e} />
        ))}
      </main>

      <Footer />
    </>
  );
}
