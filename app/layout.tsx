import type { Metadata } from "next";
import { EB_Garamond, Inter, Montserrat, Roboto_Slab } from "next/font/google";
import { Waves } from "@/components/ui/wave-background";
import { MotionProvider } from "@/components/ui/motion-provider";
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentin Suarez Mackeprang — Art Director & Designer, London",
  description:
    "Art Director and Designer based in London, working across brand identity, art direction, and web & product design for fashion and retail brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${inter.variable} ${robotoSlab.variable} ${montserrat.variable}`}
    >
      <body className="bg-neutral-950 font-sans antialiased">
        <div className="pointer-events-none fixed inset-0 z-0">
          <Waves />
        </div>
        <MotionProvider>
          <div className="relative z-10">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
