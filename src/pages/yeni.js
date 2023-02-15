import { useRouter } from "next/router"
import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const New = () => {
    const [baslik, setBaslik] = useState("");
    const router = useRouter();
    const supabase = useSupabaseClient();
    const session = useSession()

    const formSubmitted = async (event) => {
        event.preventDefault();

        if (session && session.user && session.user.id) {
            const { error } = await supabase.from('captions').insert({ user_id: session.user.id, capt_text: baslik });
            console.log(baslik, "submit");
            router.push("/");
        }
        
    }

    const inputChange = (event) => {
        setBaslik(event.target.value);
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
                <input value={baslik} onChange={inputChange} id="baslik" name="baslik"></input>
                <button>Aç</button>
            </form>
        </main>

        <Footer />
        </>
    )
}

export default New;