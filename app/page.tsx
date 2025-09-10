import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Map } from "@/components/map";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { Vision } from "@/components/vision";

import { ScrollAnim } from "@/components/scroll-anim";
import { Loader } from "@/components/loader";
import { Hero3D } from "@/components/hero-3d";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { UniverseBackgroundThree } from "@/components/universe-background-three";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <UniverseBackgroundThree />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Loader />
        <ScrollAnim />
        <Hero3D />
        <About />
        <Timeline />
        <Projects />
        <Vision />
        {/* <Map /> */}
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}
