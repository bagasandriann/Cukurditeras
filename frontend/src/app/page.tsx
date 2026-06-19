import { BookingSection } from "@/components/home/BookingSection";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Navbar />
      <main>
        <HeroSection />
        <BookingSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
