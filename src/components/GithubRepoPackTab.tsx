import React, { useState } from 'react';
import { GITHUB_README_MD, FULL_FILTERS_TXT, FULL_USERSCRIPT_JS, EXTENSION_FILES } from '../data/filterData';
import JSZip from 'jszip';
import { Github, Download, Copy, Check, FolderGit2, FileText, Star, GitBranch } from 'lucide-react';

export const GithubRepoPackTab: React.FC = () => {
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedCloneCmd, setCopiedCloneCmd] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeTab, setActiveTab] = useState<'readme' | 'tree' | 'license'>('readme');

  const cloneCommand = `git clone https://github.com/user/instashield-brave.git`;

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(GITHUB_README_MD);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCloneCmd(true);
    setTimeout(() => setCopiedCloneCmd(false), 2000);
  };

  const handleDownloadFullRepoZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const rootFolder = zip.folder('instashield-brave');

      // Root files
      rootFolder?.file('README.md', GITHUB_README_MD);
      rootFolder?.file('filters.txt', FULL_FILTERS_TXT);
      rootFolder?.file('instagram-unblock.user.js', FULL_USERSCRIPT_JS);
      rootFolder?.file('.gitignore', '# Logs\n*.log\nnode_modules/\n.DS_Store\n');
      rootFolder?.file(
        'LICENSE',
        `MIT License\n\nCopyright (c) ${new Date().getFullYear()} InstaShield Team\n\nPermission is hereby granted, free of charge, to any person obtaining a copy...`
      );

      // Extension folder
      const extFolder = rootFolder?.folder('Brave-Extension');
      EXTENSION_FILES.forEach((f) => {
        extFolder?.file(f.filename, f.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'instashield-brave-github-repo.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* GitHub Repo Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Github className="w-5 h-5 text-slate-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                GitHub Depo Paketleyicisi
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              GitHub Yayınına Hazır Proje Paketi (<code className="text-slate-300 bg-slate-950 px-2 py-0.5 rounded text-lg">instashield-brave</code>)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tüm Brave filtre kurallarını, Tampermonkey betiğini, Manifest V3 uzantısını ve detaylı Türkçe/İngilizce kurulum rehberini içeren tam GitHub deposu. Doğrudan GitHub hesabınıza yükleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadFullRepoZip}
              disabled={isZipping}
              className="px-5 py-2.5 bg-slate-100 hover:bg-white text-slate-950 rounded-xl font-bold text-xs shadow-lg transition flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-slate-900" />
              <span>{isZipping ? 'Depo Paketleniyor...' : 'Tüm GitHub Deposunu İndir (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Quick Clone Command */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300 overflow-hidden font-mono">
            <GitBranch className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-slate-400">Clone:</span>
            <span className="text-emerald-300 truncate">{cloneCommand}</span>
          </div>

          <button
            onClick={handleCopyClone}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 rounded-lg transition flex items-center gap-1.5 shrink-0"
          >
            {copiedCloneCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCloneCmd ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Repo Tabs & Views */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'readme'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              README.md
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'tree'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dosya Ağacı (Tree)
            </button>
          </div>

          <button
            onClick={handleCopyReadme}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
          >
            {copiedReadme ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReadme ? 'README Kopyalandı' : 'README Kopyala'}</span>
          </button>
        </div>

        {activeTab === 'readme' ? (
          <div className="p-6 bg-slate-950 text-slate-300 font-sans text-xs leading-relaxed space-y-4 max-h-[500px] overflow-y-auto">
            <pre className="font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {GITHUB_README_MD}
            </pre>
          </div>
        ) : (
          <div className="p-6 bg-slate-950 font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-bold">
              <FolderGit2 className="w-4 h-4" /> instashield-brave/
            </div>
            <div className="pl-6 space-y-1.5 text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-200 font-semibold">filters.txt</span>
                <span className="text-[10px] text-slate-500">(Brave Shields & uBlock Origin kuralları)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 font-semibold">instagram-unblock.user.js</span>
                <span className="text-[10px] text-slate-500">(Tampermonkey Userscript betiği)</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400 font-semibold pt-1">
                <FolderGit2 className="w-4 h-4" /> Brave-Extension/
              </div>
              <div className="pl-6 space-y-1 text-slate-400">
                <div>├── manifest.json</div>
                <div>├── content.js</div>
                <div>├── styles.css</div>
                <div>├── popup.html</div>
                <div>└── README.md</div>
              </div>
              <div className="pt-1">├── .gitignore</div>
              <div>├── LICENSE (MIT)</div>
              <div>└── README.md</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
