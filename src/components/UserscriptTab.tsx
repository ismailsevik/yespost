import React, { useState } from 'react';
import { FULL_USERSCRIPT_JS } from '../data/filterData';
import { Code, Copy, Check, Download, ExternalLink, Zap, ShieldAlert, FileCode2 } from 'lucide-react';

export const UserscriptTab: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const rawScriptUrl = `${window.location.origin}/raw/instagram-unblock.user.js`;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_USERSCRIPT_JS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([FULL_USERSCRIPT_JS], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instagram-unblock.user.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Tampermonkey & Violentmonkey Uyumlu Betik
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Instagram No-Login Userscript (<code className="text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded text-lg">instagram-unblock.user.js</code>)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Brave tarayıcısında Tampermonkey veya Violentmonkey eklentisi ile çalışan gelişmiş Kullanıcı Betiği.
              Dinamik DOM MutationObserver sayesinde sayfa yenilenmeden eklenen tüm giriş pencerelerini anında yok eder.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/raw/instagram-unblock.user.js"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Tek Tıkla Yükle (Install)</span>
            </a>

            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs transition flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs transition"
              title=".user.js olarak indir"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Zap className="w-4 h-4" /> Anında DOM Enjeksiyonu
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <code className="text-slate-300 bg-slate-950 px-1 rounded">@run-at document-start</code> modu ile sayfa henüz yüklenmeden stilleri inject eder, flickering (parlama) yapmaz.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <ShieldAlert className="w-4 h-4" /> Yönlendirme Tuzağı Engelleyici
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instagram JS engine'in sizi <code className="text-slate-300 bg-slate-950 px-1 rounded">/accounts/login</code> sayfasına fırlatmasını <code className="text-slate-300 bg-slate-950 px-1 rounded">window.location.assign</code> seviyesinde keser.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <FileCode2 className="w-4 h-4" /> Sürekli MutationObserver
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aşağı doğru kaydırdıkça arka planda oluşturulan modal elementlerini ve karartma katmanlarını mili-saniyeler içinde siler.
          </p>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-xs font-mono text-slate-400 ml-2">instagram-unblock.user.js</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono">JavaScript (ES6+)</span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700 transition"
            >
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
          </div>
        </div>

        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[500px]">
          <code>{FULL_USERSCRIPT_JS}</code>
        </pre>
      </div>
    </div>
  );
};
