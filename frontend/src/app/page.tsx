import { BookingSection } from "@/features/home/components/BookingSection";
import { Footer } from "@/features/home/components/Footer";
import { HeroSection } from "@/features/home/components/HeroSection";
import { TestimonialSection } from "@/features/home/components/TestimonialSection";
import { Navbar } from "@/shared/components/layout/Navbar";

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
