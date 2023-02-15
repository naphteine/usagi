import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const CaptionId = () => {
    const [loading, setLoading] = useState(true);
    const [caption, setCaption] = useState({ capt_text: "", id: 0 });
    const [entries, setEntries] = useState([ { id: 0, entry_text: "Entry", user_id: 0, inserted_at: "2023-01-14 14:09"} ]);
    const supabase = useSupabaseClient();
    const router = useRouter();
    const { id } = router.query;
    const session = useSession();
    const [girdi, setGirdi] = useState("");

    const fetchEntries = async () => {
        if (!id) return;
        setLoading(true);

        const { data } = await supabase
            .from("entries")
            .select("*")
            .filter("capt_id", "eq", id);

        setEntries(data);
        setLoading(false);
    }

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
        fetchEntries();
    }, [id]);

    const formSubmitted = async (event) => {
        event.preventDefault();

        let { error } = await supabase.from("entries").insert({ capt_id: id, user_id: session.user.id, entry_text: girdi});
        if (error) throw error;

        setGirdi("");

        fetchEntries();
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

            { loading && <div>Girdiler yükleniyor...</div>}

            { !loading && entries.map((entry) => {
                return (
                    <article key={entry.id}>
                        <p>{entry.entry_text}</p>

                        <b>
                            <Link href={`/profil/${entry.user_id}`}>{entry.user_id}</Link>
                        </b>

                        <em>{entry.inserted_at}</em>
                    </article>
                )
            })}
        </main>

        <Footer />
        </>
    )
}

export default CaptionId;