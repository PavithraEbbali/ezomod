import BentoGrid from "@/components/BentoGrid";
import ComparisonSection from "@/components/ComparisonSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import MetricsBar from "@/components/MetricsBar";
import Navbar from "@/components/Navbar";
import PipelineAssembly from "@/components/PipelineAssembly";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <MetricsBar />
        <PipelineAssembly />
        <BentoGrid />
        <ComparisonSection />
        <IntegrationsMarquee />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
