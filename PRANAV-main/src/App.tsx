/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ReportsPage from './pages/ReportsPage';
import AssetDetailPage from './pages/AssetDetailPage';
import DatasetPage from './pages/DatasetPage';
import MapView from './pages/MapView';
import WorkforcePage from './pages/WorkforcePage';
import SettingsPage from './pages/SettingsPage';
import RecentScansPage from './pages/RecentScansPage';
import ScanAnalysisPage from './pages/ScanAnalysisPage';
import ChatPage from './pages/ChatPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scan" element={<ScanAnalysisPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/assets" element={<HistoryPage />} /> {/* Placeholder/stub */}
          <Route path="/assets/:id" element={<AssetDetailPage />} />
          <Route path="/workforce" element={<WorkforcePage />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/datasets" element={<DatasetPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/recent" element={<RecentScansPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/docs" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

