import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lean Notes",
  description: "Lean anything while writing notes",
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
