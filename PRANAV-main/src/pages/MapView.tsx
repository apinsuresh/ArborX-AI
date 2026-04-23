import React from 'react';
import { Cloud, MapPin, Search, MousePointer2, Thermometer, ShieldAlert, Share2, X, Plus, Minus, Navigation } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MapView() {
  return (
    <div className="absolute inset-0 flex flex-col pt-20">
      <div className="flex-1 relative bg-surface-container-low overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-40 grayscale pointer-events-none">
          <img src="https://picsum.photos/seed/chicago/2000/1200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        
        {/* Floating Controls */}
        <div className="absolute top-10 left-10 flex flex-col gap-2 z-10">
          <div className="bg-surface-container-lowest shadow-2xl rounded-2xl p-2 flex flex-col border border-outline-variant/10">
            {[Navigation, Search, Thermometer].map((Icon, i) => (
              <button key={i} className={cn("p-4 rounded-xl transition-all", i === 0 ? "bg-primary text-white" : "hover:bg-surface-container-high text-on-surface-variant")}>
                <Icon className="w-6 h-6" />
              </button>
            ))}
          </div>
          <div className="bg-surface-container-lowest shadow-2xl rounded-2xl p-2 flex flex-col mt-4 border border-outline-variant/10">
            {[Plus, Minus].map((Icon, i) => (
              <button key={i} className="p-4 hover:bg-surface-container-high text-on-surface-variant transition-colors rounded-xl border-b last:border-0 border-outline-variant/10">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Overlay Panel */}
        <div className="absolute top-10 right-10 w-[440px] z-10">
          <div className="bg-surface-container-lowest shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden border border-outline-variant/10">
            <header className="relative h-48 group">
              <img src="https://picsum.photos/seed/segment/800/400?grayscale" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <button className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-8 left-10">
                <span className="px-3 py-1 bg-red-600 text-[10px] font-black text-white uppercase tracking-widest rounded-sm shadow-xl mb-3 block w-fit">CRITICAL ALERT</span>
                <h3 className="text-3xl font-display font-bold text-white tracking-wide">Infrastructure Segment A-42</h3>
              </div>
            </header>

            <div className="p-10 space-y-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
                  <div className="text-[10px] font-mono font-bold opacity-30 uppercase tracking-widest mb-1">LATITUDE</div>
                  <div className="text-sm font-bold tracking-tight">41.8781° N</div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
                  <div className="text-[10px] font-mono font-bold opacity-30 uppercase tracking-widest mb-1">LONGITUDE</div>
                  <div className="text-sm font-bold tracking-tight">87.6298° W</div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Last Scan Date', value: 'Oct 12, 2023', isValue: true },
                  { label: 'Classification', value: 'Structural Degradation', isHighlight: true },
                  { label: 'Assigned Surveyor', value: 'Marcus H.', isValue: true },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-sm font-bold">
                    <span className="opacity-40">{row.label}</span>
                    <span className={cn(row.isHighlight ? "text-red-600 underline underline-offset-4 decoration-red-200" : "text-on-surface")}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 p-8 rounded-2xl border-l-4 border-primary">
                <div className="text-[10px] font-mono font-bold tracking-widest opacity-40 uppercase mb-4">RISK ANALYSIS REPORT</div>
                <p className="text-sm leading-relaxed font-semibold italic opacity-80">
                  "Significant thermal expansion detected in concrete joints. Recommend immediate site inspection and load-bearing verification."
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 py-5 bg-primary text-white rounded-2xl font-black text-sm shadow-2xl hover:bg-primary-container transition-all">Dispatch Team</button>
                <button className="p-5 bg-surface-container-high hover:bg-surface-container-highest rounded-2xl transition-all border border-outline-variant/10 shadow-sm text-on-surface-variant">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Stats Float */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center bg-surface-container-lowest/80 backdrop-blur-xl shadow-2xl rounded-full px-10 py-6 border border-white/20 gap-12 z-10 transition-all hover:scale-105">
          <div className="flex items-center gap-6">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">ACTIVE SCANS</div>
              <div className="text-2xl font-display font-black">1,248</div>
            </div>
          </div>
          <div className="w-px h-10 bg-outline-variant/20" />
          <div className="flex items-center gap-6">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">HIGH RISK</div>
              <div className="text-2xl font-display font-black">24</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
