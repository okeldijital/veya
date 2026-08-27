import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veya",
  description: "A simple home for everything you want people to find.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
