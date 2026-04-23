import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  BrainCircuit, 
  MapPin, 
  Moon, 
  Sun,
  ShieldAlert,
  Zap,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

// Helper component for Toggle Switch
const Toggle = ({ active, onChange }: { active: boolean, onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={cn(
      "w-12 h-6 rounded-full p-1 transition-colors flex items-center shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50", 
      active ? "bg-primary" : "bg-surface-container-highest"
    )}
  >
    <div className={cn(
      "w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300", 
      active ? "translate-x-6" : "translate-x-0"
    )} />
  </button>
);

export default function SettingsPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState({
    treeAnomaly: { email: true, sms: true, push: true },
    powerLine: { email: true, sms: true, push: false },
    system: { email: true, sms: false, push: false },
  });

  const [aiSettings, setAiSettings] = useState({
    model: 'CNN',
    confidence: 85,
    sensitivity: 70,
    autoDetect: true
  });

  const [regionSettings, setRegionSettings] = useState({
    region: 'Northwest District',
    autoScan: true,
    riskFilters: ['High', 'Critical']
  });

  const [uiPrefs, setUiPrefs] = useState({
    darkMode: false,
    language: 'English'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header>
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-on-surface-variant block mb-2">
          CONFIGURATION
        </span>
        <h1 className="text-5xl font-display font-extrabold text-on-surface">System Settings</h1>
      </header>

      {/* 1. Account Access */}
      <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xxl shadow-sm border border-outline-variant/10">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold">Account Access</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-2 block">EMAIL ADDRESS</label>
              <input type="email" defaultValue="m.thorne@arborx.ai" className="w-full px-5 py-3 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent shadow-inner" />
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-2 block">CURRENT PASSWORD</label>
              <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent shadow-inner" />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-2 block">PRIMARY PHONE</label>
              <input type="tel" defaultValue="+1 (555) 012-3456" className="w-full px-5 py-3 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent shadow-inner" />
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-2 block">NEW PASSWORD</label>
              <input type="password" placeholder="Leave blank to keep current" className="w-full px-5 py-3 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent shadow-inner" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button onClick={() => navigate('/login')} className="px-8 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-black text-sm transition-all border border-red-500/20">
            Sign Out
          </button>
          <button className="px-8 py-4 bg-primary hover:bg-primary-container text-white rounded-xl font-black text-sm shadow-xl hover:-translate-y-1 transition-all">
            Update Credentials
          </button>
        </div>
      </section>

      {/* 2. Alert Preferences */}
      <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xxl shadow-sm border border-outline-variant/10 overflow-x-auto">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold">Alert Preferences</h2>
        </header>

        <div className="space-y-4 min-w-[600px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-6 text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-2">
            <div className="col-span-6">CATEGORY</div>
            <div className="col-span-2 text-center">EMAIL</div>
            <div className="col-span-2 text-center">SMS</div>
            <div className="col-span-2 text-center">PUSH</div>
          </div>

          {[
            { id: 'treeAnomaly', title: 'Tree Anomaly', desc: 'Vegetation encroachment & health alerts', icon: ShieldAlert },
            { id: 'powerLine', title: 'Power Line Fault', desc: 'Structural & thermal line issues', icon: Zap },
            { id: 'system', title: 'System Alerts', desc: 'Maintenance & platform updates', icon: Globe },
          ].map((cat) => (
            <div key={cat.id} className="grid grid-cols-12 gap-4 items-center p-6 bg-surface-container-low rounded-xl border border-outline-variant/5 hover:bg-surface-container-highest transition-colors">
              <div className="col-span-6 flex gap-4 items-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                  <cat.icon className="w-5 h-5 text-on-surface-variant" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{cat.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{cat.desc}</p>
                </div>
              </div>
              <div className="col-span-2 flex justify-center">
                <Toggle 
                  active={(alerts as any)[cat.id].email} 
                  onChange={() => setAlerts(prev => ({ ...prev, [cat.id]: { ...(prev as any)[cat.id], email: !(prev as any)[cat.id].email } }))} 
                />
              </div>
              <div className="col-span-2 flex justify-center">
                <Toggle 
                  active={(alerts as any)[cat.id].sms} 
                  onChange={() => setAlerts(prev => ({ ...prev, [cat.id]: { ...(prev as any)[cat.id], sms: !(prev as any)[cat.id].sms } }))} 
                />
              </div>
              <div className="col-span-2 flex justify-center">
                <Toggle 
                  active={(alerts as any)[cat.id].push} 
                  onChange={() => setAlerts(prev => ({ ...prev, [cat.id]: { ...(prev as any)[cat.id], push: !(prev as any)[cat.id].push } }))} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI Model Settings */}
      <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xxl shadow-sm border border-outline-variant/10">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold">AI Model Settings</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-3 block">ACTIVE MODEL</label>
              <select 
                value={aiSettings.model} 
                onChange={(e) => setAiSettings({...aiSettings, model: e.target.value})}
                className="w-full px-5 py-4 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/10 shadow-sm"
              >
                <option value="CNN">ArborDetect CNN v2.4</option>
                <option value="Custom">Custom Ensembled Model</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl border border-outline-variant/5">
              <div>
                <h4 className="font-bold text-sm">Auto-Detection</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Run inference on upload</p>
              </div>
              <Toggle active={aiSettings.autoDetect} onChange={() => setAiSettings({...aiSettings, autoDetect: !aiSettings.autoDetect})} />
            </div>
          </div>

          <div className="space-y-8 bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">CONFIDENCE THRESHOLD</label>
                <span className="text-sm font-black text-primary">{aiSettings.confidence}%</span>
              </div>
              <input 
                type="range" 
                min="50" max="99" 
                value={aiSettings.confidence}
                onChange={(e) => setAiSettings({...aiSettings, confidence: parseInt(e.target.value)})}
                className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-[10px] text-on-surface-variant mt-2 font-medium">Minimum confidence to flag an anomaly</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">SENSITIVITY CONTROL</label>
                <span className="text-sm font-black text-primary">{aiSettings.sensitivity}%</span>
              </div>
              <input 
                type="range" 
                min="10" max="100" 
                value={aiSettings.sensitivity}
                onChange={(e) => setAiSettings({...aiSettings, sensitivity: parseInt(e.target.value)})}
                className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-[10px] text-on-surface-variant mt-2 font-medium">Higher sensitivity may increase false positives</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Region Settings */}
      <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xxl shadow-sm border border-outline-variant/10">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold">Region Settings</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-3 block">PRIMARY REGION</label>
              <select 
                value={regionSettings.region}
                onChange={(e) => setRegionSettings({...regionSettings, region: e.target.value})}
                className="w-full px-5 py-4 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/10 shadow-sm"
              >
                <option value="Northwest District">Northwest District</option>
                <option value="Eastern Grid">Eastern Grid</option>
                <option value="Southern Belt">Southern Belt</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl border border-outline-variant/5">
              <div>
                <h4 className="font-bold text-sm">Auto-Scan Region</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Schedule daily drone imports</p>
              </div>
              <Toggle active={regionSettings.autoScan} onChange={() => setRegionSettings({...regionSettings, autoScan: !regionSettings.autoScan})} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest mb-3 block">RISK LEVEL FILTERS</label>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5 space-y-3">
              {['Critical', 'High', 'Medium', 'Low'].map(level => (
                <label key={level} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-transparent hover:border-primary/20 cursor-pointer transition-colors group">
                  <input 
                    type="checkbox" 
                    checked={regionSettings.riskFilters.includes(level)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRegionSettings({...regionSettings, riskFilters: [...regionSettings.riskFilters, level]});
                      } else {
                        setRegionSettings({...regionSettings, riskFilters: regionSettings.riskFilters.filter(l => l !== level)});
                      }
                    }}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary" 
                  />
                  <span className="text-sm font-bold group-hover:text-primary transition-colors">{level} Risk Events</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. UI Preferences */}
      <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xxl shadow-sm border border-outline-variant/10">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            {uiPrefs.darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
          </div>
          <h2 className="text-2xl font-display font-bold">UI Preferences</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl border border-outline-variant/5">
            <div>
              <h4 className="font-bold text-sm">Dark Mode</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">Toggle interface color theme</p>
            </div>
            <Toggle active={uiPrefs.darkMode} onChange={() => {
              const newValue = !uiPrefs.darkMode;
              setUiPrefs({...uiPrefs, darkMode: newValue});
              if (newValue) document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            }} />
          </div>

          <div>
            <select 
              value={uiPrefs.language}
              onChange={(e) => setUiPrefs({...uiPrefs, language: e.target.value})}
              className="w-full px-5 py-6 bg-surface-container-low rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/10 shadow-sm"
            >
              <option value="English">English (US)</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
