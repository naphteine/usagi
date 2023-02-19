import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "@/styles/CaptionId.module.css";

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

            setEntries(data.map((entry) => {
                const { data } = supabase
                    .from("profiles")
                    .select("*")
                    .filter("id", "eq", entry.user_id);

                console.log(data);
                return { ...entry, user: data.username  };
            }));
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

    const dateConvert = (date) => {
        const input = new Date(date);
        
        const months = ["ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"];
        const month = months[input.getMonth()];

        return `${input.getDate()} ${month} ${input.getFullYear()} ${input.getHours()}:${input.getMinutes()}`;
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
                    <article key={entry.id} className={styles.entry}>
                        <p>{entry.entry_text}</p>

                        <b>
                            <Link href={`/profil/${entry.user}`}>{entry.user}</Link>
                        </b>
                        <br />
                        <time dateTime={entry.inserted_at}>{dateConvert(entry.inserted_at)}</time>
                    </article>
                )
            })}
        </main>

        <Footer />
        </>
    )
}

export default CaptionId;