import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Technocrats TNP Cell Essay Writing",
  description: "Technocrats TNP Cell Essay Writing",
  icons: "/favicon.png",
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
