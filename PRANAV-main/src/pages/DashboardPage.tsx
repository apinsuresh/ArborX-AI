import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bytez from "bytez.js";
import { 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  ArrowRight,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { jsPDF } from 'jspdf';

const trendData = [
  { name: 'Mon', value: 99.80 },
  { name: 'Tue', value: 99.81 },
  { name: 'Wed', value: 99.82 },
  { name: 'Thu', value: 99.79 },
  { name: 'Fri', value: 99.84 },
  { name: 'Sat', value: 99.82 },
  { name: 'Sun', value: 99.82 },
];

const accuracyData = [
  { name: 'W1', value: 92 },
  { name: 'W2', value: 93 },
  { name: 'W3', value: 95 },
  { name: 'W4', value: 91 },
  { name: 'W5', value: 94 },
  { name: 'W6', value: 96 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([
    { 
      num: '01', 
      text: 'Accelerate workforce dispatch to Zone A1. Structural thermal anomalies have increased by 12% in the last 48 hours.'
    },
    { 
      num: '02', 
      text: 'De-prioritize routine inspection of Unit C-Block. AI confidence indicates high reliability for the next 180 days.'
    },
    { 
      num: '03', 
      text: 'Reallocate 15% of the reactive budget to predictive sensory hardware upgrades for coastal sectors.'
    }
  ]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const sdk = new Bytez("73545f2d4aec98bfe7321e18daa36b72");
        const model = sdk.model("meta-llama/Llama-3.1-8B-Instruct");
        
        const response = await model.run({
          messages: [
            { 
              role: "system", 
              content: "You are an AI infrastructure analyst. Generate exactly 3 short, actionable strategic recommendations for a utility company monitoring power grids and vegetation. Format as a strict JSON array of strings. Do not include markdown formatting or other text, just the raw JSON array." 
            },
            { 
              role: "user", 
              content: "Generate 3 strategic recommendations based on recent thermal anomalies and predictive maintenance data." 
            }
          ]
        });
        
        if (response && response.output) {
          let rawText = response.output;
          const match = rawText.match(/\[.*\]/s);
          if (match) rawText = match[0];
          
          const parsed = JSON.parse(rawText);
          if (Array.isArray(parsed) && parsed.length >= 3) {
            setAiRecommendations(parsed.slice(0, 3).map((text, i) => ({ num: `0${i+1}`, text })));
          }
        }
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
      } finally {
        setIsLoadingRecs(false);
      }
    };

    fetchRecs();
  }, []);

  const [liveTrendData, setLiveTrendData] = useState(() => {
    let last = 99.80;
    return Array.from({ length: 20 }, (_, i) => {
      last = last + (Math.random() - 0.5) * 0.05;
      return { name: `T-${20 - i}`, value: last };
    });
  });

  const [liveAccuracyData, setLiveAccuracyData] = useState(() => {
    let last = 94.1;
    return Array.from({ length: 20 }, (_, i) => {
      last = last + (Math.random() - 0.5) * 1.5;
      return { name: `T-${20 - i}`, value: last };
    });
  });

  const [liveSavings, setLiveSavings] = useState(4200000);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTrendData(prev => {
        const newData = [...prev.slice(1)];
        const lastValue = prev[prev.length - 1].value;
        const newValue = lastValue + (Math.random() - 0.5) * 0.05;
        newData.push({ name: Date.now().toString(), value: newValue });
        return newData;
      });

      setLiveAccuracyData(prev => {
        const newData = [...prev.slice(1)];
        const lastValue = prev[prev.length - 1].value;
        const newValue = Math.min(100, Math.max(80, lastValue + (Math.random() - 0.5) * 1.5));
        newData.push({ name: Date.now().toString(), value: newValue });
        return newData;
      });

      setLiveSavings(prev => prev + (Math.random() * 50 + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = (title?: any) => {
    const isString = typeof title === 'string';
    const reportName = isString ? title : "Regional Infrastructure Integrity Report Q3 2024";
    const filename = (isString ? title.replace(/\s+/g, '_') : "Regional_Infrastructure_Integrity_Report_Q3_2024").toLowerCase();

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 46, 31); // #0f2e1f
    doc.text("ArborX AI - Regional Integrity Audit", 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(reportName, 20, 45);
    
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);
    
    // Content
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 65);
    
    doc.setFontSize(14);
    doc.text("Executive Summary", 20, 85);
    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(
      "This document provides a comprehensive analysis of spectral imagery and telemetry data processed via the ArborDetect neural pipeline. The regional infrastructure exhibits a 99.82% integrity rating for the current quarter.",
      170
    );
    doc.text(splitText, 20, 95);
    
    doc.setFontSize(14);
    doc.text("Technical Metrics", 20, 120);
    doc.setFontSize(11);
    doc.text(`- Regional Grid Uptime: 99.82%`, 25, 130);
    doc.text(`- AI Accuracy Trend: 94.1%`, 25, 140);
    doc.text(`- Maintenance ROI: $4.2M (Projected)`, 25, 150);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Confidential technical documentation - ArborX AI Internal", 20, 280);
    
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-on-surface-variant block mb-2">
            EXECUTIVE BRIEFING
          </span>
          <h1 className="text-5xl font-display font-extrabold text-on-surface">Regional Infrastructure Integrity</h1>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-high rounded-lg text-sm font-bold border border-outline-variant/20 cursor-pointer hover:bg-surface-container-highest transition-colors">
            <Calendar className="w-4 h-4 text-on-surface-variant" />
            <input 
              type="date" 
              className="bg-transparent border-none outline-none cursor-pointer text-on-surface [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
              defaultValue="2024-07-01"
            />
          </label>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high rounded-lg text-sm font-bold border border-outline-variant/20">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Cards */}
        {[
          { label: 'REGIONAL GRID UPTIME', value: `${liveTrendData[liveTrendData.length - 1].value.toFixed(2)}%`, sub: '+0.04%', trend: liveTrendData, color: '#ef4444' },
          { label: 'AI ACCURACY TREND', value: `${liveAccuracyData[liveAccuracyData.length - 1].value.toFixed(1)}%`, sub: '+2.3%', trend: liveAccuracyData, color: '#3b82f6' },
          { label: 'MAINTENANCE ROI (SAVED VS. REACTIVE)', value: `₹${(liveSavings / 1000000).toFixed(4)}M`, sub: 'PREVENTATIVE SAVINGS', trend: [], color: '#059669', isROI: true }
        ].map((kpi, i) => (
          <div key={i} className="bg-surface-container-lowest p-8 rounded-xxl shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant uppercase">{kpi.label}</span>
              {kpi.isROI && <span className="text-xl font-display font-bold text-on-surface-variant opacity-30 italic">ROI: 3.2x</span>}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-display font-extrabold">{kpi.value}</span>
              <span className="text-xs font-bold" style={{ color: kpi.color }}>{kpi.sub}</span>
            </div>
            
            <div className="h-20 w-full">
              {kpi.trend.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.trend}>
                    <defs>
                      <linearGradient id={`colorValue${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={kpi.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={kpi.color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <Area type="monotone" dataKey="value" stroke={kpi.color} strokeWidth={3} fillOpacity={1} fill={`url(#colorValue${i})`} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="relative h-2 w-full bg-surface-container-high rounded-full mt-8 overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${(liveSavings / 6000000) * 100}%` }} />
                </div>
              )}
            </div>
            {kpi.isROI && <div className="mt-4 text-[10px] font-mono font-bold text-right text-on-surface-variant opacity-50 uppercase">TARGET: ₹6.0M</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-xxl shadow-sm border border-outline-variant/10">
            <header className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-display font-bold">Territory Risk Heatmap</h3>
                <p className="text-on-surface-variant text-sm mt-1">Anomalies detected per 10k assets</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  HIGH RISK
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  STABLE
                </div>
              </div>
            </header>
            
            <div className="relative aspect-video rounded-xl overflow-hidden group">
              <img 
                src="/assets/images/territory_heatmap.png" 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
                alt="Infrastructure Analysis"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-1/4 left-1/3 p-4 bg-white/95 rounded shadow-2xl border-l-4 border-red-500">
                <div className="text-[10px] font-mono font-bold tracking-tighter opacity-50">UNIT-A1</div>
                <div className="text-xs font-bold uppercase tracking-widest">CRITICAL</div>
              </div>

              <div className="absolute bottom-1/3 right-1/4 p-4 bg-white/95 rounded shadow-2xl border-l-4 border-emerald-500">
                <div className="text-[10px] font-mono font-bold tracking-tighter opacity-50">UNIT-C4</div>
                <div className="text-xs font-bold uppercase tracking-widest">STABLE</div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-8 rounded-xxl shadow-sm border border-outline-variant/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-display font-bold">Quarterly Infrastructure Health Report</h3>
                <p className="text-on-surface-variant text-sm mt-1">Validated technical documentation for board review</p>
              </div>
              <button 
                onClick={() => handleExport()}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                EXPORT FULL PDF
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'FINANCIAL IMPACT', date: 'Updated 2h ago', status: 'FINALIZED', icon: FileText },
                { title: 'GRID RESILIENCE', date: 'Updated 1d ago', status: 'FINALIZED', icon: TrendingUp },
                { title: 'RISK ASSESSMENT', date: 'Review Required', status: 'DRAFT', icon: AlertTriangle, isDraft: true },
                { title: 'AI MODEL DRIFT', date: 'Updated 4h ago', status: 'FINALIZED', icon: Lightbulb },
              ].map((row, i) => (
                <div 
                  key={i} 
                  onClick={() => handleExport(row.title)}
                  className="flex items-center justify-between p-5 bg-surface-container-low/50 rounded-xl hover:bg-surface-container-high transition-all group cursor-pointer border border-transparent hover:border-outline-variant/20"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", row.isDraft ? "bg-red-50" : "bg-primary/5")}>
                      <row.icon className={cn("w-5 h-5", row.isDraft ? "text-red-500" : "text-primary")} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{row.title}</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{row.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-[8px] font-mono font-bold px-2 py-0.5 rounded tracking-tighter", row.isDraft ? "bg-red-100 text-red-700" : "bg-primary/10 text-primary")}>
                      {row.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-all group-hover:translate-x-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 h-full">
          <div className="bg-primary-container text-white p-10 rounded-xxl h-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 scale-[3] pointer-events-none">
              <Lightbulb className="w-32 h-32" />
            </div>
            
            <header className="mb-14 relative z-10">
              <Lightbulb className="w-10 h-10 mb-8" />
              <h3 className="text-3xl font-display font-bold leading-tight">Strategic Recommendations</h3>
            </header>

            <div className="space-y-12 relative z-10">
              {isLoadingRecs ? (
                <div className="flex justify-center items-center h-48">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : (
                aiRecommendations.map((rec, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-3xl font-display font-bold opacity-30">{rec.num}</span>
                    <p className="text-white/80 leading-relaxed font-medium">
                      {rec.text.split(/(Zone A1|Unit C-Block|coastal sectors)/g).map((part, j) => (
                        ['Zone A1', 'Unit C-Block', 'coastal sectors'].includes(part) ? <span key={j} className="text-white font-bold">{part}</span> : part
                      ))}
                    </p>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => navigate('/history')} className="w-full mt-24 py-5 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between px-8 transition-all group relative z-10">
              <span className="font-bold text-sm">View Full Tactical Analysis</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
