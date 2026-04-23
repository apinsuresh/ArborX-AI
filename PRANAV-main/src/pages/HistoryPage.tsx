import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Share2, 
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const scans = [
  {
    image: '/assets/images/faulty_power_line.png',
    risk: 'CRITICAL RISK',
    riskColor: 'bg-red-600',
    classification: 'Faulty Power Line',
    confidence: '98.4%',
    location: 'Sector 7-G, Northwest Grid',
    time: 'Oct 24, 2024 • 14:32:01'
  },
  {
    image: '/assets/images/vegetation_warning.png',
    risk: 'MODERATE RISK',
    riskColor: 'bg-blue-600',
    classification: 'Vegetation Warning',
    confidence: '82.1%',
    location: 'East Boundary, Redwood Path',
    time: 'Oct 24, 2024 • 11:15:45'
  },
  {
    image: '/assets/images/healthy_infrastructure.png',
    risk: 'NOMINAL',
    riskColor: 'bg-green-700',
    classification: 'Healthy Infrastructure',
    confidence: '99.9%',
    location: 'Downtown Corridor, St. Main',
    time: 'Oct 23, 2024 • 09:22:12'
  },
  {
    image: '/assets/images/structural_corroding.png',
    risk: 'CRITICAL RISK',
    riskColor: 'bg-red-600',
    classification: 'Structural Corroding',
    confidence: '94.8%',
    location: 'Industrial Zone, Pier 12',
    time: 'Oct 22, 2024 • 16:45:30'
  },
  {
    image: '/assets/images/insulator_damage.png',
    risk: 'MODERATE RISK',
    riskColor: 'bg-blue-600',
    classification: 'Insulator Damage',
    confidence: '76.2%',
    location: 'Valley Substation, Tower 4',
    time: 'Oct 22, 2024 • 13:10:05'
  }
];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [riskFilter, setRiskFilter] = useState('All Risks');

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.classification.toLowerCase().includes(search.toLowerCase()) || 
                          scan.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All Types' || scan.classification === typeFilter;
    const matchesRisk = riskFilter === 'All Risks' || scan.risk === riskFilter;
    return matchesSearch && matchesType && matchesRisk;
  });

  const handleDownload = () => {
    const content = `ArborX Analytics History Report\nGenerated on: ${new Date().toLocaleString()}\n--------------------------------\nTotal Scans: 1,284\nAnomalies Detected: 42\nEfficiency Gain: +18.4%`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'arborx_analytics_report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header>
        <h1 className="text-5xl font-display font-extrabold text-on-surface mb-2">Analysis History</h1>
        <p className="text-on-surface-variant text-lg">Review and manage historical utility scans and AI-driven classification logs.</p>
      </header>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 min-w-[300px]">
          <label className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant uppercase mb-2 block">SEARCH SCANS</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Scan ID, location or equipment..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-high pl-12 pr-4 py-3 rounded-xl border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="w-56">
          <label className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant uppercase mb-2 block">ANOMALY TYPE</label>
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full appearance-none px-5 py-3 pr-10 bg-surface-container-high rounded-xl border border-outline-variant/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
            >
              <option>All Types</option>
              <option>Faulty Power Line</option>
              <option>Vegetation Warning</option>
              <option>Structural Corroding</option>
              <option>Insulator Damage</option>
              <option>Healthy Infrastructure</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
          </div>
        </div>

        <div className="w-56">
          <label className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant uppercase mb-2 block">RISK LEVEL</label>
          <div className="relative">
            <select 
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full appearance-none px-5 py-3 pr-10 bg-surface-container-high rounded-xl border border-outline-variant/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
            >
              <option>All Risks</option>
              <option>CRITICAL RISK</option>
              <option>MODERATE RISK</option>
              <option>NOMINAL</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
          </div>
        </div>

        <div className="pt-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest rounded-xl text-sm font-bold border border-outline-variant/20">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScans.map((scan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface-container-lowest rounded-xxl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={scan.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Scan" 
                referrerPolicy="no-referrer"
              />
              <div className={cn("absolute top-6 right-6 px-4 py-1.5 rounded-full text-white text-[10px] font-black tracking-[0.2em]", scan.riskColor)}>
                {scan.risk}
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-widest opacity-50 uppercase mb-1">CLASSIFICATION</div>
                  <h3 className="text-2xl font-display font-bold text-on-surface">{scan.classification}</h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono font-bold tracking-widest opacity-50 uppercase mb-1">CONFIDENCE</div>
                  <div className="text-2xl font-display font-bold text-primary">{scan.confidence}</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <MapPin className="w-4 h-4 opacity-40" />
                  <span className="text-xs font-semibold">{scan.location}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Clock className="w-4 h-4 opacity-40" />
                  <span className="text-xs font-semibold">{scan.time}</span>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <button onClick={() => navigate(`/assets/${i}`, { state: scan })} className="flex-1 py-3 bg-surface-container-high hover:bg-surface-container-highest rounded-xl text-xs font-bold transition-colors">
                  View Details
                </button>
                <button className="p-3 bg-blue-100/50 text-blue-700 hover:bg-blue-100 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="bg-primary-container text-white p-10 rounded-xxl flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 font-black text-9xl -bottom-10 -right-10 select-none pointer-events-none transform rotate-[-35deg]">
            W
          </div>
          
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest opacity-50 uppercase block mb-8">MONTHLY ANALYTICS</span>
            <h3 className="text-4xl font-display font-extrabold mb-10 leading-tight">Scan Volume Trend</h3>
            
            <div className="space-y-12">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-medium opacity-70">Total Scans</span>
                  <span className="text-4xl font-display font-black">1,284</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-medium opacity-70">Anomalies Detected</span>
                  <span className="text-4xl font-display font-black">42</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleDownload}
            className="w-full mt-10 py-5 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-3 transition-all font-bold text-sm active:scale-95"
          >
            Generate Full Report <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-10 border-t border-outline-variant/20 pt-10">
        <p className="text-on-surface-variant text-sm font-medium">Showing {filteredScans.length} of 1,284 scans</p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          {[1, 2, 3].map(n => (
            <button key={n} className={cn("w-10 h-10 rounded-lg text-sm font-bold transition-all", n === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-high hover:bg-surface-container-highest")}>
              {n}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
