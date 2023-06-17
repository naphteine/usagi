import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ProfileId = () => {
    const router = useRouter();
    const { name } = router.query;

    return (
        <>
        <Header />
        <div>
            Hello { name }
        </div>
        <Footer />
        </>
    )
}

export default ProfileId;