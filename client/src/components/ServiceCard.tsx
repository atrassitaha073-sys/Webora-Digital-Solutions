import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
    >
      <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
        <ArrowUpRight size={24} />
      </div>
      
      <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit text-white group-hover:scale-110 transition-transform duration-300 border border-white/5">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold font-display mb-3 text-white group-hover:text-white/90">
        {title}
      </h3>
      
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}
