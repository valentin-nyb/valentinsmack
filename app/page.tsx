import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Packages />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
