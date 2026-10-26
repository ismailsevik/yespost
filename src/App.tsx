import React, { useState } from 'react';
import { AppTab } from './types';
import { Header } from './components/Header';
import { FilterListTab } from './components/FilterListTab';
import { UserscriptTab } from './components/UserscriptTab';
import { ExtensionBuilderTab } from './components/ExtensionBuilderTab';
import { GithubRepoPackTab } from './components/GithubRepoPackTab';
import { LiveSimulatorTab } from './components/LiveSimulatorTab';
import { ProfileProxyViewer } from './components/ProfileProxyViewer';
import { InstallationGuide } from './components/InstallationGuide';
import { GeminiOptimizerModal } from './components/GeminiOptimizerModal';
import { FULL_FILTERS_TXT, FULL_USERSCRIPT_JS, EXTENSION_FILES, GITHUB_README_MD } from './data/filterData';
import JSZip from 'jszip';
import { Shield, Github, Heart, Sparkles, Download, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('filters');
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [isZipGenerating, setIsZipGenerating] = useState(false);

  const handleDownloadAllZip = async () => {
    setIsZipGenerating(true);
    try {
      const zip = new JSZip();
      const repoFolder = zip.folder('instashield-brave');

      repoFolder?.file('README.md', GITHUB_README_MD);
      repoFolder?.file('filters.txt', FULL_FILTERS_TXT);
      repoFolder?.file('instagram-unblock.user.js', FULL_USERSCRIPT_JS);
      repoFolder?.file('.gitignore', '# Logs\n*.log\nnode_modules/\n.DS_Store\n');
      repoFolder?.file(
        'LICENSE',
        `MIT License\n\nCopyright (c) ${new Date().getFullYear()} InstaShield Team\n\nPermission is hereby granted, free of charge, to any person obtaining a copy...`
      );

      const extFolder = repoFolder?.folder('Brave-Extension');
      EXTENSION_FILES.forEach((f) => {
        extFolder?.file(f.filename, f.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'instashield-brave-full-pack.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGeminiModal={() => setIsGeminiOpen(true)}
        onDownloadAllZip={handleDownloadAllZip}
        isZipGenerating={isZipGenerating}
      />

      {/* Main Body Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'filters' && <FilterListTab onOpenGeminiModal={() => setIsGeminiOpen(true)} />}
        {activeTab === 'userscript' && <UserscriptTab />}
        {activeTab === 'extension' && <ExtensionBuilderTab />}
        {activeTab === 'github' && <GithubRepoPackTab />}
        {activeTab === 'simulator' && <LiveSimulatorTab />}
        {activeTab === 'proxy' && <ProfileProxyViewer />}
        {activeTab === 'installation' && <InstallationGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-400" />
                <span className="font-bold text-white text-sm">InstaShield Brave</span>
                <span className="text-xs text-slate-400">• Instagram İçerik Filtreleme & Eklenti Paketleyicisi</span>
              </div>
              <p className="text-xs text-slate-400 max-w-lg">
                Brave Browser, uBlock Origin ve Tampermonkey için Instagram giriş duvarlarını, popup'larını ve kaydırma kısıtlamalarını kaldıran açık kaynaklı çözüm.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
              <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Brave Shields %100 Uyumlu
              </span>
              <button
                onClick={handleDownloadAllZip}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>GitHub Reposunu İndir (.ZIP)</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} InstaShield Brave Project. MIT Lisansı altında açık kaynak kodludur.</span>
            <div className="flex items-center gap-1">
              <span>Brave Browser & uBlock Origin topluluğu için geliştirilmiştir</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Gemini AI Rules Optimizer Modal */}
      <GeminiOptimizerModal isOpen={isGeminiOpen} onClose={() => setIsGeminiOpen(false)} />
    </div>
  );
}
