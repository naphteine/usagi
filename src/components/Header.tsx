import Link from "next/link";
import styles from "../styles/Header.module.css";
import rabbit from "../../public/rabbit.svg";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        usagi
        <Image priority src={rabbit} width={50} alt="usagisözlük" />
        sozlük
      </Link>

      <div className={styles.search}>
        <form>
          <input placeholder="Ara..."></input>
          <button type="submit">Ara</button>
        </form>
      </div>
    </header>
  );
}
