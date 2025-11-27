import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
