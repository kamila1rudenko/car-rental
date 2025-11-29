import styles from "./Home.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textWrapper}>
            <h1 className={styles.heroTitle}>Find your first rental car</h1>
            <h2 className={styles.heroSubtitle}>
              Reliable and budget-friendly rentals for any journey
            </h2>
          </div>
          <Link href="/catalog" className={styles.heroCta}>
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
