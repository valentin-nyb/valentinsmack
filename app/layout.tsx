import type { Metadata } from "next";
import { EB_Garamond, Inter, Montserrat, Roboto_Slab } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Waves } from "@/components/ui/wave-background";
import { MotionProvider } from "@/components/ui/motion-provider";
import { ScrollRestoration } from "@/components/ui/scroll-restoration";
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
  metadataBase: new URL("https://valentinsmack.com"),
  title: "Valentin Suarez Mackeprang — Art Director & Designer, London",
  description:
    "Art Director and Designer based in London, working across brand identity, art direction, and web & product design for fashion and retail brands.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${inter.variable} ${robotoSlab.variable} ${montserrat.variable}`}
    >
      <body className="bg-neutral-950 font-sans antialiased">
        <ScrollRestoration />
        <div className="pointer-events-none fixed inset-0 z-0">
          <Waves />
        </div>
        <MotionProvider>
          <div className="relative z-10">{children}</div>
        </MotionProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
