import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moonlit Tarot Companion",
  description: "Thai-first tarot-style emotional companion MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" data-theme="dark">
      <body >
        {children}
      </body>
    </html>
  );
}
