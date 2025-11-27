"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoPrimary}>Rental</span>
          <span className={styles.logoAccent}>Car</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              pathname === "/" ? styles.navLinkActive : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.navLink} ${
              pathname.startsWith("/catalog") ? styles.navLinkActive : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
