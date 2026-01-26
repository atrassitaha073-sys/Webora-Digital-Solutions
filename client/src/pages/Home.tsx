import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useSubmitContact } from "@/hooks/use-contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { 
  Globe, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Code2,
  Zap
} from "lucide-react";
import brandingCard from "@assets/image_1769420995583.png";

const contactSchema = api.contact.submit.input;
type ContactFormValues = z.infer<typeof contactSchema>;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { mutate, isPending } = useSubmitContact();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={containerRef}>
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-white/5 to-transparent rounded-full blur-3xl opacity-20 translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium tracking-wide uppercase text-gray-300">Accepting new projects</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                Digital Creation & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                  AI Solutions.
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                Webora crafts premium digital experiences, automating workflows and integrating intelligent solutions to elevate your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact"
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#portfolio"
                  className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  View Work
                </a>
              </div>
            </motion.div>

            <motion.div 
              style={{ y, opacity }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10" />
                <img 
                  src={brandingCard} 
                  alt="Webora Branding" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-duration-700 transition-transform duration-700" 
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute -bottom-12 -left-8 w-40 h-40 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Expertise</h2>
            <p className="text-gray-400">
              We blend creativity with technology to deliver solutions that drive growth and efficiency for modern businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              index={0}
              icon={<Globe size={32} strokeWidth={1.5} />}
              title="Web Creation"
              description="Custom, high-performance websites designed to captivate your audience. We build responsive, accessible, and stunning digital platforms."
            />
            <ServiceCard 
              index={1}
              icon={<Code2 size={32} strokeWidth={1.5} />}
              title="Automation"
              description="Streamline your operations with custom workflow automations. We eliminate repetitive tasks so you can focus on strategy and growth."
            />
            <ServiceCard 
              index={2}
              icon={<Sparkles size={32} strokeWidth={1.5} />}
              title="AI Solutions"
              description="Leverage the power of artificial intelligence. From chatbots to predictive analytics, we integrate smart solutions into your business."
            />
          </div>
        </div>
      </section>

      {/* FEATURE/ABOUT SECTION */}
      <section className="py-24 border-t border-white/5 bg-neutral-950/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5 h-48 w-full flex flex-col justify-end">
                     <span className="text-4xl font-display font-bold text-white">98%</span>
                     <span className="text-gray-500 text-sm">Client Satisfaction</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-white/5 h-64 w-full flex flex-col justify-between group">
                    <div className="p-3 bg-black text-white w-fit rounded-lg">
                      <Zap size={24} />
                    </div>
                    <div>
                      <span className="block text-black font-bold text-xl mb-1">Fast Delivery</span>
                      <span className="text-gray-600 text-sm">We value your time</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-neutral-800 p-6 rounded-2xl border border-white/5 h-64 w-full flex flex-col justify-between">
                    <div className="p-3 bg-white text-black w-fit rounded-lg">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <span className="block text-white font-bold text-xl mb-1">Cutting Edge</span>
                      <span className="text-gray-400 text-sm">Latest tech stack</span>
                    </div>
                  </div>
                  <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5 h-48 w-full flex flex-col justify-end">
                     <span className="text-4xl font-display font-bold text-white">50+</span>
                     <span className="text-gray-500 text-sm">Projects Launched</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Why choose Webora?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We don't just build websites; we build digital ecosystems. Our approach combines aesthetic excellence with robust engineering to create solutions that scale.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Tailored strategies for your unique goals",
                  "Seamless integration of modern technologies",
                  "Focus on user experience and conversion",
                  "Ongoing support and optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-white" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-neutral-900 to-black rounded-full blur-3xl -z-10 opacity-50" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Let's work together</h2>
              <p className="text-gray-400">Tell us about your project and let's create something extraordinary.</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    {...form.register("name")}
                    type="text"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    {...form.register("email")}
                    type="email"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all resize-none"
                  placeholder="Tell us about your project needs..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isPending ? (
                  <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Send Message <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
