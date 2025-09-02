

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
export default function HomePage() {
  return (
    <div>
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <Hero />

        {/* FEATURES */}
        <Features />

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}