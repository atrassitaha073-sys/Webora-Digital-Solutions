import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingPlans } from "@/components/PricingPlans";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <PricingPlans showTitle={true} />
      <Footer />
    </div>
  );
}
