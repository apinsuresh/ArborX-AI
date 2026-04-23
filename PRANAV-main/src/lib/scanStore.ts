export interface ScanResult {
  id: string;
  fileName: string;
  fileSize: number;
  resultType: 'healthy' | 'warning' | 'danger';
  resultText: string;
  confidence: string;
  timestamp: string;
}

const STORAGE_KEY = 'digitalsurveyor_scans';

export function saveScan(scan: Omit<ScanResult, 'id' | 'timestamp'>): ScanResult {
  const scans = getRecentScans();
  
  const newScan: ScanResult = {
    ...scan,
    id: Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString(),
  };
  
  scans.unshift(newScan); // Add to beginning
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
  } catch (e) {
    console.error('Failed to save scan to localStorage', e);
  }
  
  return newScan;
}

export function getRecentScans(): ScanResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse scans from localStorage', e);
    return [];
  }
}

export function clearScans(): void {
  localStorage.removeItem(STORAGE_KEY);
}
