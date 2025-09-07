import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Map } from "@/components/map";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { Vision } from "@/components/vision";
import { ScrollAnim } from "@/components/scroll-anim";
import { Loader } from "@/components/loader";
import { Hero3D } from "@/components/hero-3d";

export default function Home() {
  return (
    <main>
      <Loader />
      <ScrollAnim />
      <Hero3D />
      <About />
      <Timeline />
      <Projects />
      <Vision />
      <Map />
      <Contact />
    </main>
  );
}
