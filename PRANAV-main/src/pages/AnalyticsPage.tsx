import React, { useState, useEffect } from 'react';
import { getRecentScans, ScanResult } from '../lib/scanStore';
import { 
  Calendar, 
  Filter, 
  ArrowUp,
  TrendingDown,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';

const initialConvergenceData = [
  { epoch: 0, solid: 0.1, dashed: 0.05 },
  { epoch: 10, solid: 0.2, dashed: 0.1 },
  { epoch: 20, solid: 0.35, dashed: 0.15 },
  { epoch: 30, solid: 0.55, dashed: 0.25 },
  { epoch: 40, solid: 0.75, dashed: 0.4 },
  { epoch: 50, solid: 0.9, dashed: 0.6 },
  { epoch: 60, solid: 1.1, dashed: 0.75 },
  { epoch: 70, solid: 1.3, dashed: 0.85 },
  { epoch: 80, solid: 1.5, dashed: 1.0 },
  { epoch: 90, solid: 1.6, dashed: 1.1 },
  { epoch: 100, solid: 1.7, dashed: 1.15 },
  { epoch: 110, solid: 1.75, dashed: 1.12 },
  { epoch: 120, solid: 1.78, dashed: 1.05 },
  { epoch: 130, solid: 1.76, dashed: 0.95 },
  { epoch: 140, solid: 1.74, dashed: 0.9 },
  { epoch: 150, solid: 1.8, dashed: 0.85 },
  { epoch: 160, solid: 1.85, dashed: 0.82 },
];

export default function AnalyticsPage() {
  const [accuracy, setAccuracy] = useState(98.42);
  const [loss, setLoss] = useState(0.042);
  const [vram, setVram] = useState(11.2);
  const [latency, setLatency] = useState(14);
  const [chartData, setChartData] = useState(initialConvergenceData);
  const [isLive, setIsLive] = useState(true);
  const [scans, setScans] = useState<ScanResult[]>([]);

  // Load real scans from store
  useEffect(() => {
    setScans(getRecentScans());
    const handleStorageChange = () => setScans(getRecentScans());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Real-time data simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Fluctuate metrics slightly to simulate live training/inference
      setAccuracy(prev => {
        const next = prev + (Math.random() * 0.04 - 0.02);
        return Number(Math.min(99.99, Math.max(90.00, next)).toFixed(2));
      });
      
      setLoss(prev => {
        const next = prev + (Math.random() * 0.004 - 0.002);
        return Number(Math.max(0.01, next).toFixed(3));
      });
      
      setVram(prev => {
        const next = prev + (Math.random() * 0.4 - 0.2);
        return Number(Math.min(15.8, Math.max(8.0, next)).toFixed(1));
      });
      
      setLatency(prev => {
        const next = prev + (Math.random() * 4 - 2);
        return Math.round(Math.min(30, Math.max(8, next)));
      });

      // Shift line chart data to create a scrolling effect
      setChartData(prev => {
        const newData = [...prev];
        const lastData = newData[newData.length - 1];
        
        newData.shift(); // Remove oldest point
        newData.push({
          epoch: lastData.epoch + 10,
          solid: lastData.solid + (Math.random() * 0.1 - 0.04),
          dashed: lastData.dashed + (Math.random() * 0.08 - 0.03),
        });
        
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-full bg-slate-50 text-slate-900 font-sans p-8 transition-colors duration-500">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Model Performance Metrics</h1>
            {isLive && (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold tracking-widest uppercase rounded-full animate-pulse border border-emerald-200 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Live Sync
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm font-medium">Forensic analysis of convolutional neural network accuracy and convergence.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-semibold shadow-sm transition-all ${isLive ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            {isLive ? 'Pause Stream' : 'Resume Live'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" />
            ResNet-50 All
          </button>
        </div>
      </header>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">Real-time Accuracy</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tight text-slate-900 tabular-nums">{accuracy}</span>
              <span className="text-2xl font-bold text-slate-400">%</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-6 text-xs font-bold text-emerald-500 uppercase tracking-wider">
            <ArrowUp className="w-3 h-3" />
            +{(accuracy - 96.32).toFixed(2)}% FROM BASELINE
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">Current Loss</div>
            <div className="text-4xl font-black tracking-tight text-slate-900 tabular-nums">{loss.toFixed(3)}</div>
          </div>
          <div className="flex items-center gap-1 mt-6 text-xs font-bold text-emerald-500 uppercase tracking-wider">
            <TrendingDown className="w-3 h-3" />
            OPTIMAL CONVERGENCE
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Resource Utilization</div>
              <div className="text-[10px] font-bold text-slate-400 tabular-nums">VRAM: {vram.toFixed(1)}GB / 16GB</div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-[#111827] rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: `${(vram / 16) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest animate-pulse">GPU ACCELERATION: ACTIVE</div>
            <div className="text-[9px] font-bold text-slate-900 uppercase tracking-widest tabular-nums">LATENCY: {latency}ms</div>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Iteration Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Iteration Comparison</h2>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">ResNet-50 V1 vs V2 Architecture Performance</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#111827] rounded-sm animate-pulse" />
                <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">V2 DYNAMIC</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-slate-200 rounded-sm" />
                <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">V1 LEGACY</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-2">
                <span className="text-slate-400">Accuracy</span>
                <span className="text-slate-900 tabular-nums">{accuracy}% VS 94.2%</span>
              </div>
              <div className="relative h-3 w-full">
                <div className="absolute top-0 left-0 h-full bg-slate-200 rounded-sm w-[94.2%]" />
                <div 
                  className="absolute top-0 left-0 h-full bg-[#111827] rounded-sm transition-all duration-1000 ease-in-out" 
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-2">
                <span className="text-slate-400">Precision</span>
                <span className="text-slate-900 tabular-nums">{(accuracy - 2.3).toFixed(1)}% VS 91.8%</span>
              </div>
              <div className="relative h-3 w-full">
                <div className="absolute top-0 left-0 h-full bg-slate-200 rounded-sm w-[91.8%]" />
                <div 
                  className="absolute top-0 left-0 h-full bg-[#111827] rounded-sm transition-all duration-1000 ease-in-out" 
                  style={{ width: `${accuracy - 2.3}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-2">
                <span className="text-slate-400">Recall</span>
                <span className="text-slate-900 tabular-nums">{(accuracy - 0.6).toFixed(1)}% VS 95.5%</span>
              </div>
              <div className="relative h-3 w-full">
                <div className="absolute top-0 left-0 h-full bg-slate-200 rounded-sm w-[95.5%]" />
                <div 
                  className="absolute top-0 left-0 h-full bg-[#111827] rounded-sm transition-all duration-1000 ease-in-out" 
                  style={{ width: `${accuracy - 0.6}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Training Convergence */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col relative overflow-hidden">
          <h2 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Live Convergence Stream</h2>
          
          <div className="flex-1 min-h-[200px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <Line type="monotone" dataKey="solid" stroke="#111827" strokeWidth={5} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="dashed" stroke="#cbd5e1" strokeWidth={4} strokeDasharray="8 8" dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute top-[40%] right-0 text-[8px] font-bold text-slate-400 tracking-widest rotate-90 transform origin-right">
              STREAMING
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 relative z-10">
            <div className="text-center">
              <div className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1 tabular-nums">Epochs (Live)</div>
            </div>
            <div />
            
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Val Loss Min</span>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-slate-900 tabular-nums">{loss.toFixed(4)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Stability Index</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-slate-900">OPTIMAL</span>
            </div>
          </div>

          {/* Subtle background gradient to make it look "live" */}
          {isLive && (
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
          )}
        </div>
      </div>

      {/* Bottom Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Active Inference Jobs</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Model ID..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-slate-400 transition-colors w-64 bg-slate-50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model ID</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loss</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batches</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scans.length > 0 ? scans.map((scan) => (
                <tr key={scan.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 text-sm font-black text-slate-900">{scan.id.toUpperCase().slice(0, 8)}</td>
                  <td className="py-5 px-6 text-sm font-medium text-slate-500">{new Date(scan.timestamp).toLocaleString()}</td>
                  <td className="py-5 px-6 text-sm font-black text-slate-900 tabular-nums">{scan.confidence}</td>
                  <td className="py-5 px-6 text-sm font-medium text-slate-500 tabular-nums">-</td>
                  <td className="py-5 px-6 text-sm font-medium text-slate-500">1/1</td>
                  <td className="py-5 px-6 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold tracking-widest uppercase border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Complete
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm font-medium text-slate-400">
                    No recent scans uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase ml-2">Showing {scans.length} runs</span>
          <div className="flex gap-2 mr-2">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
