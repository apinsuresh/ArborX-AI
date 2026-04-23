import React, { useEffect, useState } from 'react';
import { getRecentScans, ScanResult, clearScans } from '../lib/scanStore';
import { Trash2, AlertTriangle, ShieldCheck, Database, Calendar, FileImage } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function RecentScansPage() {
  const [scans, setScans] = useState<ScanResult[]>([]);

  useEffect(() => {
    // Load scans initially
    setScans(getRecentScans());
    
    // Setup listener for storage changes so it updates across tabs
    const handleStorageChange = () => setScans(getRecentScans());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all recent scan data?')) {
      clearScans();
      setScans([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-on-surface-variant block mb-2">
            AI ANALYSIS ARCHIVE
          </span>
          <h1 className="text-5xl font-display font-extrabold text-on-surface">Recent Scan Reports</h1>
        </div>
        {scans.length > 0 && (
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-bold border border-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </header>

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-surface-container-lowest rounded-xxl border border-outline-variant/10 shadow-sm">
          <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-6">
            <Database className="w-10 h-10 text-on-surface-variant/50" />
          </div>
          <h3 className="text-2xl font-bold font-display text-on-surface mb-2">No scans recorded yet</h3>
          <p className="text-on-surface-variant max-w-md">
            Click the "+ Start New Scan" button in the sidebar to run the neural network against your first infrastructure dataset. Your timeline will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan, i) => {
            const isDanger = scan.resultType === 'danger';
            const isWarning = scan.resultType === 'warning';
            
            return (
              <motion.div 
                key={scan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "p-6 rounded-xl border flex items-center gap-6 shadow-sm transition-all hover:shadow-md bg-surface-container-lowest group relative overflow-hidden",
                  isDanger ? "border-red-200" : isWarning ? "border-yellow-200" : "border-emerald-200"
                )}
              >
                {/* Decorative left border indicator */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1.5",
                  isDanger ? "bg-error" : isWarning ? "bg-yellow-400" : "bg-primary"
                )} />

                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  isDanger ? "bg-red-100" : isWarning ? "bg-yellow-100" : "bg-emerald-100"
                )}>
                  {isDanger || isWarning ? (
                    <AlertTriangle className={cn("w-6 h-6", isDanger ? "text-error" : "text-yellow-600")} />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn(
                      "font-bold text-lg leading-none",
                      isDanger ? "text-error" : isWarning ? "text-yellow-600" : "text-primary"
                    )}>
                      {scan.resultText}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-surface-container-high px-2 py-0.5 rounded font-bold text-on-surface-variant">
                      ID: {scan.id.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-on-surface-variant mt-2">
                    <span className="flex items-center gap-1.5">
                      <FileImage className="w-3.5 h-3.5 opacity-60" />
                      <span className="truncate max-w-[200px]">{scan.fileName}</span>
                    </span>
                    <span className="opacity-30">•</span>
                    <span className="font-mono text-xs">{(scan.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant opacity-60 uppercase mb-1">Conf. Score</div>
                  <div className="text-2xl font-display font-black text-on-surface">{scan.confidence}</div>
                </div>
                
                <div className="w-px h-12 bg-outline-variant/20 mx-4 hidden md:block" />
                
                <div className="hidden md:block text-right">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant opacity-60 uppercase mb-1">Timestamp</div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-on-surface">
                    <Calendar className="w-4 h-4 text-on-surface-variant opacity-70" />
                    {new Date(scan.timestamp).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
