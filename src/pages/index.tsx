import Head from "next/head";
import { ListResult } from "pocketbase";

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import DictEntry from "@/components/DictEntry";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pb from "../../lib/pocketbase";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [arama, setArama] = useState(false);
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

  async function makeSearch(term: any) {
    const resultList = await pb.collection("usagi_captions").getList(1, 50, {
      expand: "user",
      filter: `name~"${term}"`,
      $autoCancel: false,
    });

    setDictData(resultList);
  }

  function searched(e: any) {
    e.preventDefault();
    if (searchTerm.length > 0) {
      setArama(true);
      makeSearch(searchTerm);
    } else {
      getAll();
      setArama(false);
    }
  }

  function searchChange(e: any) {
    if (e.target.value.length <= 0) {
      getAll();
      setArama(false);
    } else {
      setSearchTerm(e.target.value);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Head>
        <title>UsagiSözlük</title>
        <meta name="description" content="Güzel olan her şeyin sözlüğü" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.search}>
          <form onSubmit={searched}>
            <input
              onChange={searchChange}
              onSubmit={searched}
              placeholder="Ara..."
            ></input>
            <button type="submit">Ara</button>
          </form>
        </div>
        {arama ? <h2>Arama sonuçları</h2> : <h2>Son eklenenler</h2>}
        {dictData?.items?.map((e) => (
          <DictEntry key={e.id} data={e} />
        ))}
      </main>

      <Footer />
    </>
  );
}
