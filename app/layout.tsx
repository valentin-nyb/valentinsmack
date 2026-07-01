import type { Metadata } from "next";
import { EB_Garamond, Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentin Suarez Mackeprang — Art Director & Designer",
  description: "Art Director and Designer based in London. Brand identity, web design, AI design tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable} ${robotoSlab.variable}`}>
      <body className="bg-white dark:bg-neutral-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
