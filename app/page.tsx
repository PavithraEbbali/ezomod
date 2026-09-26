import ContactSection from "@/components/ContactSection";
import Differentiator from "@/components/Differentiator";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import OperationalShift from "@/components/OperationalShift";
import Process from "@/components/Process";
import Services from "@/components/Services";

export default function Page() {
  return (
    <>
      <Hero />
      <Differentiator />
      <Services />
      <Process />
      <OperationalShift />
      <Integrations />
      <ContactSection />
    </>
  );
}
