import React from 'react';
import { AppTab } from '../types';
import { Shield, Code, Puzzle, Github, Play, Eye, BookOpen, Sparkles, Download } from 'lucide-react';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenGeminiModal: () => void;
  onDownloadAllZip: () => void;
  isZipGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenGeminiModal,
  onDownloadAllZip,
  isZipGenerating,
}) => {
  const tabs: { id: AppTab; labelTr: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'filters', labelTr: 'Brave Filtre Kuralları', labelEn: 'Brave Filter Rules', icon: <Shield className="w-4 h-4 text-orange-400" /> },
    { id: 'userscript', labelTr: 'Userscript (Tampermonkey)', labelEn: 'Userscript', icon: <Code className="w-4 h-4 text-emerald-400" /> },
    { id: 'extension', labelTr: 'Brave Eklentisi (V3)', labelEn: 'Brave Extension', icon: <Puzzle className="w-4 h-4 text-purple-400" /> },
    { id: 'github', labelTr: 'GitHub Depo Paketi', labelEn: 'GitHub Repo Pack', icon: <Github className="w-4 h-4 text-slate-300" /> },
    { id: 'simulator', labelTr: 'Filtre Test Simülatörü', labelEn: 'Filter Simulator', icon: <Play className="w-4 h-4 text-pink-400" /> },
    { id: 'proxy', labelTr: 'Profil Önizleyici', labelEn: 'Profile Previewer', icon: <Eye className="w-4 h-4 text-sky-400" /> },
    { id: 'installation', labelTr: 'Kurulum Rehberi', labelEn: 'Install Guide', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & Status Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 rounded-xl shadow-lg shadow-orange-500/20 ring-1 ring-white/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-white tracking-tight">
                    InstaShield <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Brave</span>
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full">
                    v2.4.0
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  İnstagram Giriş Duvarı & Popup Engelleyici (Brave Browser)
                </p>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenGeminiModal}
                className="p-2 bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
                title="AI İle Kural Eniyileştir"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
              </button>
              <button
                onClick={onDownloadAllZip}
                disabled={isZipGenerating}
                className="p-2 bg-gradient-to-r from-orange-500 to-rose-600 text-white rounded-lg text-xs font-medium shadow-md transition"
                title="GitHub Paketini İndir (.ZIP)"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Brave Shields Uyumlu</span>
            </div>

            <button
              onClick={onOpenGeminiModal}
              className="px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-medium transition flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Kural Eniyileştirici</span>
            </button>

            <button
              onClick={onDownloadAllZip}
              disabled={isZipGenerating}
              className="px-4 py-1.5 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg text-xs font-semibold shadow-md shadow-orange-500/20 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isZipGenerating ? 'ZIP Oluşturuluyor...' : 'GitHub Paketi İndir (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 mt-3 pt-2 overflow-x-auto no-scrollbar border-t border-slate-800/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.icon}
                <span>{tab.labelTr}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
