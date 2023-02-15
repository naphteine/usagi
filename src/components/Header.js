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
            <div className={styles.logoArea}>
                <Link className={styles.logo} href="/">usagisözlük</Link> <em className={styles.description}>iyi olan her şey</em>
            </div>
            

            {session ? (
                <div>
                    <Link className={styles.button} href="/yeni">Başlık aç</Link>
                    <Link className={styles.button} href="/profil">Profil</Link>
                    <button className={styles.button} onClick={logout}>Çıkış</button>
                </div>
            ) : (
                <>
                    <Link href="/giris">Giriş yap</Link>
                </>
            )}
        </header>
    )
}

export default Header;