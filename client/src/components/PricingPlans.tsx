import { motion } from "framer-motion";
import { CheckCircle2, Zap, Cpu, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const plans = [
  {
    name: "Webora Basic",
    tagline: "For small businesses & freelancers",
    icon: Globe,
    features: [
      "Simple showcase website (1-3 pages)",
      "Modern & responsive design",
      "Mobile optimized",
      "Contact section (email)",
      "Deployment included",
    ],
    results: [
      "Professional visibility",
      "Immediate credibility",
    ],
  },
  {
    name: "Webora Advanced",
    tagline: "For ambitious businesses",
    icon: Zap,
    featured: true,
    features: [
      "Complex & custom website",
      "Modern animations (scroll, 3D)",
      "Backend & server",
      "Database integration",
      "Dynamic forms",
      "Performance & security",
    ],
    results: [
      "Premium user experience",
      "High-converting website",
    ],
  },
  {
    name: "Webora AI Suite",
    tagline: "The complete AI-powered solution",
    icon: Cpu,
    featured: true,
    features: [
      "Everything in Advanced",
      "Integrated AI chatbot (24/7)",
      "Custom AI agent",
      "Client automation",
      "User request analysis",
    ],
    results: [
      "Less manual work",
      "More leads",
      "Intelligent business",
    ],
  },
  {
    name: "Webora Autopilot",
    tagline: "Your business on autopilot",
    icon: Rocket,
    features: [
      "Everything in AI Suite",
      "Main AI agent (business brain)",
      "Complete automations:",
      "  - Client responses",
      "  - Appointment scheduling",
      "  - Quote generation",
      "Tool integrations:",
      "  - Email",
      "  - WhatsApp",
      "  - CRM",
      "Tracking dashboard",
      "Ongoing maintenance & optimization",
    ],
    results: [
      "Fully automated operations",
      "24/7 business intelligence",
    ],
  },
];

interface PricingPlansProps {
  showTitle?: boolean;
  compact?: boolean;
}

export function PricingPlans({ showTitle = true, compact = false }: PricingPlansProps) {
  const handleGetStarted = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ width: 4, height: 4 }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-100, -400],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {showTitle && (
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
              Our Offers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </motion.div>
        )}

        <div className={`grid ${
          compact 
            ? 'grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'
        }`}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.featured 
                  ? 'bg-white/10 border-2 border-white/30' 
                  : 'bg-white/5 border border-white/10'
              } ${compact ? 'p-6' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <plan.icon className="w-7 h-7" />
                </motion.div>
                <h3 className={`font-bold font-display mb-2 ${compact ? 'text-xl' : 'text-2xl'}`}>{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.tagline}</p>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Includes:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">Results:</p>
                <ul className="space-y-2">
                  {plan.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-white/80">→</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={handleGetStarted}
                className={`w-full ${
                  plan.featured 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                data-testid={`button-get-started-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        {showTitle && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-muted-foreground">
              Need a custom solution?{" "}
              <a 
                onClick={handleGetStarted}
                className="text-white underline hover:no-underline cursor-pointer"
              >
                Contact us
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
