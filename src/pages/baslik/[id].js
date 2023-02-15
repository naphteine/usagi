import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const CaptionId = () => {
    const [caption, setCaption] = useState({ capt_text: "", id: 0 });
    const [entries, setEntries] = useState([ { id: 0, entry: "Entry", user: { id: 0, name: "gguilt" }, date: "2023-01-14 14:09"} ]);
    const supabase = useSupabaseClient();
    const router = useRouter();
    const { id } = router.query;
    const session = useSession();
    const [girdi, setGirdi] = useState("");

    useEffect(() => {
        const getCaption = async () => {
            if (!id) return;

            const { data } = await supabase
                .from("captions")
                .select("*")
                .filter("id", "eq", id)
                .single();

                setCaption(data);
        };

        getCaption();
    }, [id]);

    const formSubmitted = (event) => {
        event.preventDefault();
        console.log(girdi, "submitted");
    }

    const girdiChange = (event) => {
        setGirdi(event.target.value);
    }

    return (
        <>
        <Header />

        <main>
            {session && session.user &&
                <form onSubmit={formSubmitted}>
                    <textarea value={girdi} onChange={girdiChange} placeholder="girdi"></textarea>
                    <button>Gönder</button>
                </form>
            }
            <h1>{caption.capt_text}</h1>

            { entries.map((entry) => {
                return (
                    <article key={entry.id}>
                        <p>{entry.entry}</p>

                        <b><Link href={`/profil/${entry.user.id}`}>{entry.user.name}</Link></b> - <em>{entry.date}</em>
                    </article>
                )
            })}
        </main>

        <Footer />
        </>
    )
}

export default CaptionId;