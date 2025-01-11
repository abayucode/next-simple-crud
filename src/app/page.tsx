import React, {  } from "react";
import styles from "./page.module.css";
import Link from "next/link";


export default function App() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/login">Login</Link>
        <Link href="/booking">Booking</Link>
      </main>
    </div>
  );
}
