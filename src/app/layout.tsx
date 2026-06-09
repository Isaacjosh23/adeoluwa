import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adedamola & Oluwaseun · 15.08.2026",
  description:
    "Join us as we celebrate our union. 16 August 2026 · Lagos, Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
