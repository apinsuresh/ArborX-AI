import React, { useState, useEffect } from 'react';
import { MapPin, Users, Navigation, Thermometer, ShieldAlert, Zap, TreePine, Search, Bell, Settings } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '../lib/utils';

const createCrewIcon = (color: string, isMoving: boolean) => {
  // Use truck icon for all crews, whether moving or stationary
  const truckSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`;
  return L.divIcon({
    className: 'custom-leaflet-icon bg-transparent border-0',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}; display: flex; align-items: center; justify-content: center;">${truckSvg}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const createWarningIcon = (priority: string) => {
  const color = priority === 'High' ? '#ef4444' : '#f97316';
  const size = priority === 'High' ? 40 : 30;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
  return L.divIcon({
    className: 'custom-leaflet-icon bg-transparent border-0 animate-pulse',
    html: `<div style="filter: drop-shadow(0 0 12px ${color});">${svg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
};

const colors = {
  active: '#10b981', // green
  repairing: '#3b82f6', // blue
  alert: '#ef4444', // red
  idle: '#9ca3af' // grey
};

const mapCenter: [number, number] = [11.2393, 76.9600]; // Karamadai, Coimbatore

// Mock data - localized around Karamadai, Coimbatore
const initialCrews = [
  { id: 'c1', name: 'Pranav M. Sangeeth', status: 'In Transit', loc: [11.2250, 76.9400], target: [11.2420, 76.9580], color: colors.active, eta: '4 mins', operators: 3, vehicle: '1 Vehicle', img: 'https://picsum.photos/seed/c1/100/100' },
  { id: 'c2', name: 'R. Gangadharan', status: 'Repairing', loc: [11.2350, 76.9650], target: null, color: colors.repairing, progress: '65%', operators: 2, vehicle: 'Heavy Rig', img: 'https://picsum.photos/seed/c2/100/100' },
  { id: 'c3', name: 'K. Madhuvinesh', status: 'Stalled', loc: [11.2500, 76.9500], target: null, color: colors.idle, operators: 4, vehicle: 'Crane', img: 'https://picsum.photos/seed/c3/100/100' },
  { id: 'c4', name: 'Naveena I.', status: 'In Transit', loc: [11.2600, 76.9750], target: [11.2420, 76.9580], color: colors.active, eta: '12 mins', operators: 2, vehicle: 'Light Truck', img: 'https://picsum.photos/seed/c4/100/100' },
];

const alerts = [
  { id: 'AN-9044', time: 'Just now', title: 'Power Line Broken', desc: 'Critical infrastructure failure. Main high-tension line severed. Dispatch crews immediately.', type: 'Critical Fault', priority: 'High', locName: 'KARAMADAI, SECTOR 7', coords: [11.2420, 76.9580], icon: Zap },
  { id: 'AN-8912', time: '14m ago', title: 'Pressure Drop Detected', desc: 'Main conduit showing 15% pressure variance from baseline.', type: 'Sensor Alert', priority: 'Medium', locName: 'METTUPALAYAM ROAD', coords: [11.2350, 76.9650], icon: Thermometer },
  { id: 'AN-7740', time: '45m ago', title: 'Vegetation Encroachment', desc: 'LiDAR scan detected high-risk growth near local transformer.', type: 'Tree Risk', priority: 'Low', locName: 'BELLADHI LAKE AREA', coords: [11.2500, 76.9500], icon: TreePine },
];

export default function WorkforcePage() {
  const [crews, setCrews] = useState(initialCrews);

  // Simulate movement for in-transit crews
  useEffect(() => {
    const interval = setInterval(() => {
      setCrews(prev => prev.map(crew => {
        if (crew.status === 'In Transit' && crew.target) {
          const dx = (crew.target[0] - crew.loc[0]) * 0.05;
          const dy = (crew.target[1] - crew.loc[1]) * 0.05;
          // Simple mock: slowly move towards target
          return { ...crew, loc: [crew.loc[0] + dx, crew.loc[1] + dy] as [number, number] };
        }
        return crew;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col gap-6 max-w-[1600px] mx-auto overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 shadow-sm shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search location or anomaly..." 
              className="w-full bg-surface-container-high pl-12 pr-4 py-2.5 rounded-xl border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm font-bold"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-high rounded-xl border border-outline-variant/10">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest opacity-80 uppercase">14 ACTIVE CREWS</span>
          </div>
          <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-surface-container-low" />
          </button>
        </div>
      </header>

      {/* Main Content: 3 Columns */}
      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left Panel: Alerts */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar shrink-0">
          <div className="flex items-center gap-3 mb-2 px-2">
            <ShieldAlert className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-display font-bold">Incoming Alerts</h3>
          </div>
          {alerts.map((alert, i) => (
            <div key={i} className={cn(
              "p-5 rounded-2xl border transition-all cursor-pointer backdrop-blur-md",
              alert.priority === 'High' ? "bg-red-500/5 border-red-500/30 shadow-[0_4px_20px_rgba(239,68,68,0.1)]" : "bg-surface-container-lowest border-outline-variant/10 hover:border-primary/30"
            )}>
              <div className="flex justify-between items-start mb-4">
                <span className={cn(
                  "px-2 py-0.5 text-[9px] font-black rounded uppercase tracking-wider",
                  alert.priority === 'High' ? "bg-red-100 text-red-700" : 
                  alert.priority === 'Medium' ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                )}>
                  {alert.priority} PRIORITY
                </span>
                <span className="text-[10px] font-bold opacity-40">{alert.time}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <alert.icon className={cn("w-4 h-4", alert.priority === 'High' ? "text-red-500" : "text-primary")} />
                <h4 className="text-sm font-display font-bold">{alert.type}</h4>
              </div>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-4 line-clamp-2">{alert.desc}</p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold opacity-60">
                <MapPin className="w-3 h-3" /> {alert.locName}
              </div>
            </div>
          ))}
        </div>

        {/* Center Panel: Map */}
        <div className="flex-1 bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-lg relative min-h-0 z-0">
          <MapContainer center={mapCenter} zoom={13} className="w-full h-full" zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {/* Alerts warning markers */}
            {alerts.map((alert, i) => (
              <Marker 
                key={`alert-${i}`} 
                position={alert.coords as [number, number]} 
                icon={createWarningIcon(alert.priority)}
              >
                <Popup className="font-sans">
                  <strong className="text-sm font-bold text-gray-900">{alert.title}</strong><br/>
                  <span className="text-xs text-gray-600 font-medium">{alert.type}</span>
                </Popup>
              </Marker>
            ))}

            {/* Crew Routes */}
            {crews.map(crew => crew.target && (
              <Polyline 
                key={`path-${crew.id}`} 
                positions={[crew.loc as [number, number], crew.target as [number, number]]} 
                pathOptions={{ color: crew.color, weight: 2, dashArray: '5, 10', className: 'opacity-50' }} 
              />
            ))}

            {/* Crew Markers */}
            {crews.map(crew => (
              <Marker key={crew.id} position={crew.loc as [number, number]} icon={createCrewIcon(crew.color, crew.status === 'In Transit')}>
                <Popup>
                  <strong className="font-bold text-gray-900">{crew.name}</strong><br/>
                  <span className="text-sm text-gray-600 font-medium">{crew.status}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Map Overlays */}
          <div className="absolute top-6 left-6 z-[400] flex flex-col gap-2 pointer-events-none">
             <div className="px-4 py-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-white shadow-xl">
               <div className="text-[10px] font-mono font-bold tracking-widest opacity-60 mb-1">REGION</div>
               <div className="text-sm font-bold flex items-center gap-2"><Navigation className="w-3 h-3 text-primary" /> Karamadai, Coimbatore</div>
             </div>
          </div>
          
          <div className="absolute bottom-6 left-6 z-[400] px-4 py-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-white flex gap-6 shadow-xl pointer-events-none">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest"><div className="w-2 h-2 rounded-full bg-emerald-500"/> ACTIVE</div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest"><div className="w-2 h-2 rounded-full bg-blue-500"/> REPAIRING</div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest"><div className="w-2 h-2 rounded-full bg-red-500"/> ALERT</div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest"><div className="w-2 h-2 rounded-full bg-gray-400"/> IDLE</div>
          </div>
        </div>

        {/* Right Panel: Dispatch Info */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto pl-2 custom-scrollbar shrink-0">
          <div className="flex items-center gap-3 mb-2 px-2">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-display font-bold">Active Dispatch</h3>
          </div>
          {crews.map((crew, i) => (
            <div key={i} className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: crew.color }} />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm">
                  <img src={crew.img} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold">{crew.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: crew.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-60">{crew.status}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-surface-container-low rounded-lg p-2 text-center">
                  <div className="text-[9px] font-mono font-bold opacity-40 uppercase">ETA / Progress</div>
                  <div className="text-xs font-bold text-on-surface-variant mt-0.5">{crew.eta || crew.progress || '--'}</div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-2 text-center">
                  <div className="text-[9px] font-mono font-bold opacity-40 uppercase">Details</div>
                  <div className="text-xs font-bold text-on-surface-variant mt-0.5">{crew.operators} Ops</div>
                </div>
              </div>
              <button className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container-highest rounded-xl text-xs font-bold transition-colors">
                Assign / Reassign
              </button>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
