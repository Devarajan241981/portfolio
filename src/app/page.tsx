import { About } from "@/components/About";
import { CodeDump } from "@/components/CodeDump";
import { Contact, Footer } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Extras } from "@/components/Extras";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Extras />
        <Contact />
        <CodeDump />
      </main>
      <Footer />
    </div>
  );
}
