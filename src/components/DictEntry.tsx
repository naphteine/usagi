import { useEffect, useState } from "react";
import { ListResult } from "pocketbase";
import pb from "../../lib/pocketbase";
import styles from "@/styles/DictEntry.module.css";
import Link from "next/link";

export default function DictEntry(dict: any) {
  return (
    <div className={styles.entry}>
      <Link href={`/${dict.data.name}`}>{dict.data.name}</Link>{" "}
    </div>
  );
}
