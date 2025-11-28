import Image from "next/image";
import styles from "./Home.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImageWrapper}>
        <Image
          src="/public/hero/Picture.jpg"
          alt="Fast car on the highway"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroGradient} />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Find your perfect rental car</h1>
        <p className={styles.heroSubtitle}>
          Reliable and budget-friendly rentals for any journey.
        </p>
        <Link href="/catalog" className={styles.heroCta}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
