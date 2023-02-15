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