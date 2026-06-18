import { HeroSection } from "@/components/home/HeroSection";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
