import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from './providers'

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "KlickYC",
  description: "KlickYC is a KYC oracle that allows you to identify a user in just a few clicks using open-banking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
