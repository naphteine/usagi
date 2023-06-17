import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [toplamBaslik, setToplamBaslik] = useState(0);
  const [toplamGirdi, setToplamGirdi] = useState(0);

  async function getToplams() {
    const { totalItems: baslik } = await pb
      .collection("usagi_captions")
      .getList(1, 1, { $autoCancel: false });
    const { totalItems: girdi } = await pb
      .collection("usagi_entries")
      .getList(1, 1, { $autoCancel: false });

    setToplamBaslik(baslik);
    setToplamGirdi(girdi);
  }

  useEffect(() => {
    getToplams();
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <p>Tüm hakları saklıdır. &copy; 2021-2023.</p>
      </footer>
    </>
  );
}
