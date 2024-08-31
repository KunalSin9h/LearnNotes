import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Technocrats TNP Cell Essay Writing",
  description: "Technocrats TNP Cell Essay Writing",
  icons: "/favicon.png",

  publisher: "Kunal Singh",
  authors: [{ name: "Kunal Singh", url: "https://kunalsin9h.com" }],
  colorScheme: "light",
  openGraph: {
    title: "TNP Cell Essay Writing",
    description: "Technocrats TNP Cell Essay Writing",
    url: "https://tnpcell.vercel.app",
    siteName: "Essay Practice",
    images: [
      { url: "https://i.imgur.com/e3jFZNC.jpeg", width: 1200, height: 650 },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TNP Cell Essay Writing",
    images: {
      url: "https://i.imgur.com/e3jFZNC.jpeg",
    },
  }
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
