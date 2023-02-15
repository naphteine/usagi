/*
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [captions, setCaptions] = useState(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const getCaptions = async () => {
      if (!loading) return;

      let { data } = await supabase.from("captions").select("id, capt_text");
      setCaptions(data);
      setLoading(false);
    }

    getCaptions();
  }, []);

  return (
    <>
      <Header/>

      <main>
        <ul>
          {loading && <div>Yükleniyor...</div>}

          {!loading && captions && captions.map((c) => {
            return <li key={c.id}><Link href={`/baslik/${c.id}`}>{c.capt_text}</Link></li>
          })}

          {!loading && !captions && <div>Başlıklar bulunamadı</div>}
        </ul>
      </main>

      <Footer />
    </>
  )
}

export default Home
*/

import Link from "next/link";
import { useEffect } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { supabase } from "../lib/supabaseClient";

const Home = ({ captions }) => {
  return (
    <>
      <Header/>

      <main>
        <ul>
          {captions && captions.map((c) => {
            return <li key={c.id}><Link href={`/baslik/${c.id}`}>{c.capt_text}</Link></li>
          })}

          {!captions && <div>Başlıklar bulunamadı</div>}
        </ul>
      </main>

      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  let { data } = await supabase.from('captions').select()

  return {
    props: {
      captions: data
    },
  }
}

export default Home