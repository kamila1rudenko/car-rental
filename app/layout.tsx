import type { Metadata } from "next";
import "./globals.css";
import styles from "./Home.module.css";
import Header from "@/components/Header/Header";
import { manrope } from "./fonts";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Reliable and budget-friendly rentals for any journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className={styles.pageWrapper}>
        <TanStackProvider>
          <Header />
          <main className={styles.main}>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
