import Header from "@/components/Header/Header";
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroImage} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Find your perfect rental car</h1>
            <p className={styles.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </p>
            <button
              className={styles.cta}
              onClick={() => {
                window.location.href = "/catalog";
              }}
            >
              View Catalog
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
