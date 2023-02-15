import { useRouter } from "next/router"
import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const New = () => {
    const [baslik, setBaslik] = useState("");
    const [girdi, setGirdi] = useState("");

    const router = useRouter();
    const supabase = useSupabaseClient();
    const session = useSession()

    const formSubmitted = async (event) => {
        event.preventDefault();

        if (session && session.user && session.user.id) {
            const { data, error } = await supabase.from('captions').insert({ user_id: session.user.id, capt_text: baslik }).select().single();
            const { entryError } = await supabase.from('entries').insert({ capt_id: data.id, user_id: session.user.id, entry_text: girdi });
            router.push(`/baslik/${data.id}`);
        }
        
    }

    const inputChange = (event) => {
        if (event.target.id == "baslik") {
            setBaslik(event.target.value);
        } else if (event.target.id == "girdi") {
            setGirdi(event.target.value);
        }
    }

    return (
        <>
        <Header />

        <main>
            Başlık açma ekranı

            <form onSubmit={formSubmitted}>
                <label htmlFor="baslik">
                    Başlık
                </label>
                <input value={baslik} onChange={inputChange} id="baslik" name="baslik" placeholder="başlık başa"></input>

                <label htmlFor="girdi">
                    İlk Girdi
                </label>
                <textarea value={girdi} onChange={inputChange} id="girdi" name="girdi" placeholder="girdiniz"></textarea>

                <button>Aç</button>
            </form>
        </main>

        <Footer />
        </>
    )
}

export default New;