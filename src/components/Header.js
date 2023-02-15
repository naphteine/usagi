import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession } from '@supabase/auth-helpers-react'

const Header = () => {
    const supabase = useSupabaseClient()
    const session = useSession();

    const logout = async () => {
        await supabase.auth.signOut();
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">usagisözlük</Link> <em>iyi olan her şey</em>
            </div>
            

            {session ? (
                <div>
                    [{" "}
                    <Link href="/yeni">Başlık aç</Link> ::{" "}
                    <Link href="/profil">Profil</Link> ::{" "}
                    <button onClick={logout}>Çıkış</button>
                    {" "}]
                </div>
            ) : (
                <>
                    <br />
                    Giriş yapmadınız.{" "}
                    <Link href="/giris">Giriş yap</Link>
                </>
            )}
        </header>
    )
}

export default Header;