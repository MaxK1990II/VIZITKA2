import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Map } from "@/components/map";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { Vision } from "@/components/vision";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Vision />
      <Map />
      <Contact />
    </main>
  );
}
