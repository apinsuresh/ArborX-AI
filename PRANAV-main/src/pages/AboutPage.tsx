import React from 'react';
import { Leaf, Zap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  {
    icon: Leaf,
    title: 'Precision Management',
    label: 'VEGETATION CONTROL',
    description: 'Predicting encroachment patterns with 94% accuracy, allowing for targeted pruning rather than mass clearing.',
    accent: 'bg-green-600'
  },
  {
    icon: Zap,
    title: 'Outage Prevention',
    label: 'GRID RESILIENCE',
    description: 'Reducing unplanned utility downtime by 30% through automated structural risk assessment across remote territories.',
    accent: 'border-blue-500'
  },
  {
    icon: Users,
    title: 'Community Safety',
    label: 'SOCIAL IMPACT',
    description: 'Protecting critical community services—hospitals, schools, and emergency lines—from weather-related grid failures.',
    accent: 'bg-green-800'
  }
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl font-display font-bold mb-6">Social Impact & Infrastructure Safety</h2>
        <p className="text-on-surface-variant text-lg">
          A single fallen branch can disconnect thousands of families from essential services. Our technology prioritizes vegetation management to prevent outages before they happen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container-lowest p-10 rounded-xxl shadow-sm border-l-4 border-primary transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center mb-10 group-hover:bg-primary transition-colors">
              <stat.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-on-surface-variant mb-3 block">
              {stat.label}
            </span>
            <h3 className="text-2xl font-display font-bold mb-6">{stat.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group overflow-hidden rounded-[32px] aspect-[16/9]">
          <img src="https://picsum.photos/seed/drone/1200/675" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Drone Analysis" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <h3 className="text-3xl font-display font-bold text-white mb-4">Multi-Spectral Analysis</h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Our models process LIDAR, thermal, and high-resolution RGB imagery to identify microscopic structural weaknesses invisible to the human eye.
            </p>
          </div>
        </div>
        
        <div className="bg-primary/95 text-white p-16 rounded-[32px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-20 transform translate-x-10 -translate-y-10 scale-150 rotate-12">
            <Zap className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-10">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">Adaptive AI</h3>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm font-medium">
              The engine continuously learns from every scan, adapting to local flora types and evolving environmental conditions in real-time.
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 flex items-end justify-between relative z-10">
            <div>
              <div className="text-6xl font-display font-black">99.8%</div>
              <div className="text-xs font-mono font-bold tracking-widest uppercase opacity-50 mt-2">UPTIME RELIABILITY BENCHMARK</div>
            </div>
            <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      <footer className="mt-40 pt-12 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant text-xs font-mono font-bold">
        <div>© 2024 THE DIGITAL SURVEYOR. INFRASTRUCTURE INTELLIGENCE FOR THE MODERN WORLD.</div>
        <div className="flex gap-8">
          {['PRIVACY POLICY', 'TECHNICAL TERMS', 'API REFERENCE'].map(item => (
            <a key={item} href="#" className="hover:text-on-surface transition-colors">{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
