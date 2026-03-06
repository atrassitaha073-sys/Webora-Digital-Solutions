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
import { PricingPlans } from "@/components/PricingPlans";
import { 
  Globe, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Code2,
  Cpu,
  Zap
} from "lucide-react";

const contactSchema = api.contact.submit.input;
type ContactFormValues = z.infer<typeof contactSchema>;

function FloatingShape({ 
  className, 
  delay = 0, 
  duration = 20,
  rotateDirection = 1
}: { 
  className?: string; 
  delay?: number; 
  duration?: number;
  rotateDirection?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateX: [0, 15 * rotateDirection, 0, -15 * rotateDirection, 0],
        rotateY: [0, 20 * rotateDirection, 0, -20 * rotateDirection, 0],
        rotateZ: [0, 5 * rotateDirection, 0, -5 * rotateDirection, 0],
        y: [0, -30, 0, 30, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        rotateX: { duration, repeat: Infinity, ease: "easeInOut", delay },
        rotateY: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
        rotateZ: { duration: duration * 0.8, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration: duration * 0.6, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    />
  );
}

function Cube3D({ size = 120, delay = 0 }: { size?: number; delay?: number }) {
  const faces = [
    { transform: `translateZ(${size/2}px)`, bg: "bg-white/10" },
    { transform: `translateZ(-${size/2}px) rotateY(180deg)`, bg: "bg-white/5" },
    { transform: `translateX(${size/2}px) rotateY(90deg)`, bg: "bg-white/8" },
    { transform: `translateX(-${size/2}px) rotateY(-90deg)`, bg: "bg-white/8" },
    { transform: `translateY(-${size/2}px) rotateX(90deg)`, bg: "bg-white/12" },
    { transform: `translateY(${size/2}px) rotateX(-90deg)`, bg: "bg-white/5" },
  ];

  return (
    <motion.div
      className="relative"
      style={{ 
        width: size, 
        height: size, 
        transformStyle: "preserve-3d",
        perspective: 1000 
      }}
      initial={{ opacity: 0, rotateX: -30, rotateY: -30 }}
      animate={{ 
        opacity: 1,
        rotateX: [-30, 30, -30],
        rotateY: [-30, 30, -30],
      }}
      transition={{
        opacity: { duration: 1.5, delay },
        rotateX: { duration: 15, repeat: Infinity, ease: "easeInOut", delay },
        rotateY: { duration: 20, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {faces.map((face, i) => (
        <div
          key={i}
          className={`absolute inset-0 ${face.bg} border border-white/20 backdrop-blur-sm`}
          style={{ 
            transform: face.transform,
            transformStyle: "preserve-3d",
          }}
        />
      ))}
    </motion.div>
  );
}

function Planet3D({ size = 200, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size * 2, height: size * 2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay }}
    >
      {/* Orbital path */}
      <motion.div
        className="absolute inset-0 border border-white/10 rounded-full"
        style={{ transform: "rotateX(70deg)" }}
      />
      <motion.div
        className="absolute inset-[15%] border border-white/5 rounded-full"
        style={{ transform: "rotateX(70deg)" }}
      />

      {/* Main Planet */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: size, height: size }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4), transparent 40%),
              radial-gradient(circle at 75% 75%, rgba(100,100,100,0.3), transparent 40%),
              linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)
            `,
            boxShadow: `
              inset -20px -20px 60px rgba(0,0,0,0.8),
              inset 10px 10px 40px rgba(255,255,255,0.1),
              0 0 80px rgba(255,255,255,0.1),
              0 0 120px rgba(255,255,255,0.05)
            `,
          }}
        >
          {/* Surface details - continents */}
          <div 
            className="absolute w-[40%] h-[30%] rounded-full bg-white/10 blur-sm"
            style={{ top: '20%', left: '15%' }}
          />
          <div 
            className="absolute w-[35%] h-[25%] rounded-full bg-white/8 blur-sm"
            style={{ top: '50%', left: '45%' }}
          />
          <div 
            className="absolute w-[25%] h-[20%] rounded-full bg-white/6 blur-sm"
            style={{ top: '35%', left: '60%' }}
          />
          {/* Atmosphere glow */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)',
            }}
          />
        </div>
      </motion.div>

      {/* Orbiting moon */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ 
          width: size * 2, 
          height: size * 2,
          marginLeft: -size,
          marginTop: -size,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size * 0.2,
            height: size * 0.2,
            left: '85%',
            top: '50%',
            transform: 'translateY(-50%)',
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 50%),
              linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)
            `,
            boxShadow: `
              inset -5px -5px 15px rgba(0,0,0,0.5),
              0 0 20px rgba(255,255,255,0.1)
            `,
          }}
        />
      </motion.div>

      {/* Second orbiting object - satellite */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ 
          width: size * 1.5, 
          height: size * 1.5,
          marginLeft: -size * 0.75,
          marginTop: -size * 0.75,
          transform: "rotateX(60deg) rotateZ(30deg)",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-3 h-3 bg-white/60 rounded-full"
          style={{
            left: '90%',
            top: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
          }}
        />
      </motion.div>

      {/* Orbit ring effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size * 1.4,
          height: size * 0.3,
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          transform: 'rotateX(75deg)',
        }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function Torus3D({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="relative w-40 h-40"
      initial={{ opacity: 0, rotateX: 60 }}
      animate={{
        opacity: 1,
        rotateX: [60, 70, 60],
        rotateZ: [0, 360],
      }}
      transition={{
        opacity: { duration: 1.5, delay },
        rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
        rotateZ: { duration: 20, repeat: Infinity, ease: "linear", delay },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-white/40"
          style={{
            left: "50%",
            top: "50%",
            transform: `rotate(${i * 15}deg) translateX(60px) translateY(-6px)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.08,
          }}
        />
      ))}
    </motion.div>
  );
}

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
        {/* Animated gradient backgrounds */}
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium tracking-wide uppercase text-gray-300">Accepting new projects</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Digital Creation & <br />
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  AI Solutions.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Webora crafts premium digital experiences, automating workflows and integrating intelligent solutions to elevate your business.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a 
                  href="#contact"
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  href="#services"
                  className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Our Services
                </motion.a>
              </motion.div>
            </motion.div>

            {/* 3D Elements Section */}
            <motion.div 
              style={{ y, opacity }}
              className="relative hidden lg:flex items-center justify-center h-[600px]"
            >
              {/* Main Sphere */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Planet3D size={140} delay={0} />
              </div>

              {/* Floating Cube */}
              <div className="absolute top-10 right-10">
                <Cube3D size={80} delay={0.3} />
              </div>

              {/* Torus */}
              <div className="absolute bottom-20 left-0">
                <Torus3D delay={0.5} />
              </div>

              {/* Small floating shapes */}
              <FloatingShape 
                className="absolute top-20 left-10 w-6 h-6 bg-white/30 rounded-full"
                delay={0.2}
                duration={12}
              />
              <FloatingShape 
                className="absolute bottom-32 right-20 w-4 h-4 bg-white/20 rounded-sm rotate-45"
                delay={0.4}
                duration={15}
                rotateDirection={-1}
              />
              <FloatingShape 
                className="absolute top-40 right-32 w-8 h-8 border-2 border-white/30 rounded-full"
                delay={0.6}
                duration={18}
              />
              <FloatingShape 
                className="absolute bottom-40 left-20 w-5 h-5 bg-white/15"
                delay={0.8}
                duration={14}
                rotateDirection={-1}
              />

              {/* Orbital rings */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d", transform: "rotateX(70deg)" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateY(20deg)" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="mb-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Expertise</h2>
            <p className="text-gray-400">
              We blend creativity with technology to deliver solutions that drive growth and efficiency for modern businesses.
            </p>
          </motion.div>

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
      <section className="py-24 border-t border-white/5 bg-neutral-950/30 relative overflow-hidden">
        {/* 3D Background elements */}
        <motion.div
          className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <Cube3D size={300} delay={0} />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="order-2 lg:order-1 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <motion.div 
                    className="bg-neutral-900 p-6 rounded-2xl border border-white/5 h-48 w-full flex flex-col justify-end"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                     <span className="text-4xl font-display font-bold text-white">98%</span>
                     <span className="text-gray-500 text-sm">Client Satisfaction</span>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-6 rounded-2xl border border-white/5 h-64 w-full flex flex-col justify-between group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 bg-black text-white w-fit rounded-lg">
                      <Zap size={24} />
                    </div>
                    <div>
                      <span className="block text-black font-bold text-xl mb-1">Fast Delivery</span>
                      <span className="text-gray-600 text-sm">We value your time</span>
                    </div>
                  </motion.div>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    className="bg-neutral-800 p-6 rounded-2xl border border-white/5 h-64 w-full flex flex-col justify-between"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 bg-white text-black w-fit rounded-lg">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <span className="block text-white font-bold text-xl mb-1">Cutting Edge</span>
                      <span className="text-gray-400 text-sm">Latest tech stack</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-neutral-900 p-6 rounded-2xl border border-white/5 h-48 w-full flex flex-col justify-end"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                     <span className="text-4xl font-display font-bold text-white">50+</span>
                     <span className="text-gray-500 text-sm">Projects Launched</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
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
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <CheckCircle2 className="text-white" size={20} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <PricingPlans showTitle={true} compact={false} />

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        {/* 3D decorative element */}
        <motion.div
          className="absolute -left-20 top-1/4 opacity-10"
          animate={{ 
            rotateY: [0, 360],
            rotateX: [0, 180, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Planet3D size={250} />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Let's work together</h2>
              <p className="text-gray-400">Tell us about your project and let's create something extraordinary.</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    {...form.register("name")}
                    type="text"
                    data-testid="input-name"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                  )}
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    {...form.register("email")}
                    type="email"
                    data-testid="input-email"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                  )}
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number (Optional)</label>
                  <input
                    {...form.register("phone")}
                    type="tel"
                    data-testid="input-phone"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="plan" className="text-sm font-medium text-gray-300">Which plan interests you?</label>
                  <select
                    {...form.register("plan")}
                    data-testid="select-plan"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="Webora Basic" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Webora Basic</option>
                    <option value="Webora Advanced" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Webora Advanced</option>
                    <option value="Webora AI Suite" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Webora AI Suite</option>
                    <option value="Webora Autopilot" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Webora Autopilot</option>
                    <option value="Custom" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Custom Solution</option>
                  </select>
                </motion.div>
              </div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  data-testid="input-message"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all resize-none"
                  placeholder="Tell us about your project needs..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
                )}
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isPending}
                data-testid="button-submit"
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isPending ? (
                  <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Send Message <ArrowRight size={18} /></>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
