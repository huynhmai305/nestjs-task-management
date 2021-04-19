import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Tasks!</h1>

        <div className={styles.grid}>
          <a href="/signin" className={styles.card}>
            <h3>Login &rarr;</h3>
            <p>Sign in to experience it!</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer">
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
