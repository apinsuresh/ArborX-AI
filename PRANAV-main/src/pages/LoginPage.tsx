import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight, Loader2, ShieldCheck, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const handleDemoLogin = () => {
    setIsDemoLoading(true);
    setEmail('demo@arborx.ai');
    setPassword('demo123');
    setTimeout(() => {
      setIsDemoLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050907] font-sans text-white">
      
      {/* Left Panel - Branding & Visuals (Hidden on smaller screens) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-[#0a100d] border-r border-white/5">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-emerald-900/30 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen opacity-50" />
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-display font-extrabold tracking-tight">ArborX AI</span>
        </div>

        <div className="relative z-10 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl font-display font-extrabold leading-[1.1] mb-6">
              Predictive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Infrastructure</span> <br />
              Intelligence.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-md font-medium">
              Monitor millions of miles of high-voltage transmission lines with satellite-guided precision and AI-driven thermal anomaly detection.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold">99.9%</div>
                <div className="text-xs text-white/50 font-mono tracking-widest uppercase mt-1">Uptime</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-bold">&lt; 10ms</div>
                <div className="text-xs text-white/50 font-mono tracking-widest uppercase mt-1">Latency</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs font-mono tracking-widest text-white/40 uppercase">
          <span>Secure Substation Connection</span>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 flex lg:hidden items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-extrabold tracking-tight">ArborX AI</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-display font-extrabold mb-3">Welcome back</h2>
            <p className="text-white/50 text-sm font-medium">Enter your credentials to access the operational hub.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold tracking-widest uppercase text-white/50 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@arborx.ai"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">Password</label>
                  <a href="#" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

            </div>

            <button 
              type="submit" 
              disabled={isLoading || isDemoLoading}
              className="w-full bg-primary hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-8"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate'}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-x-0 h-[1px] bg-white/10"></div>
              <span className="relative bg-[#050907] px-4 text-xs font-mono font-bold tracking-widest uppercase text-white/30">Or select demo account</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Pranav M. Sangeeth', email: 'pranav@arborx.ai', pass: 'admin123' },
                { name: 'R. Gangadharan', email: 'ganga@arborx.ai', pass: 'admin123' },
                { name: 'K. Madhuvinesh', email: 'madhu@arborx.ai', pass: 'admin123' },
                { name: 'Naveena I.', email: 'naveena@arborx.ai', pass: 'admin123' },
              ].map((account) => (
                <button
                  key={account.name}
                  type="button"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.pass);
                  }}
                  className="bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white text-xs font-bold py-3 px-3 rounded-xl border border-white/10 transition-all text-left truncate"
                >
                  <div className="font-display text-sm truncate">{account.name}</div>
                  <div className="text-[10px] font-mono opacity-50 truncate mt-0.5">{account.email}</div>
                </button>
              ))}
            </div>
          </form>

        </motion.div>
      </div>
    </div>
  );
}
