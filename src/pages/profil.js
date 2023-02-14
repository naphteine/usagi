import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Profile = () => {
    const session = useSession()

    return (
        <>
        <Header />

        {session ?
            (
                <Account session={session} />
            ) : (
                <div>
                    <Link href="/giris">Giriş yapınız</Link>
                </div>
            )
        }

        <Footer />
        </>
    )
}

export default Profile;