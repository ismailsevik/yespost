import React from 'react';
import { BookOpen, Shield, Code, Puzzle, CheckCircle2, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';

export const InstallationGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Brave Browser & uBlock Adblock Kurulum Rehberi
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Adım Adım Kurulum Yöntemleri
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Brave tarayıcısında Instagram profillerini hesap oluşturmadan incelemek için 3 temel yöntem bulunur. Tercihinize uygun yöntemi adımları takip ederek aktif edin.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Method 1: Brave Shields */}
        <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-5 space-y-4 shadow-xl relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="text-sm font-bold text-white">Brave Shields Özel Filtreler</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Herhangi bir eklenti kurmadan doğrudan Brave tarayıcısının dahili Shields korumasına ekleyin.
            </p>

            <ol className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">•</span>
                <span>Brave'de adres çubuğuna <code className="text-orange-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">brave://settings/shields/filters</code> yazın.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">•</span>
                <span><b>Özel Filtreler Oluştur (Create custom filters)</b> kutusuna gelin.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">•</span>
                <span>Bu uygulamadaki <b>filters.txt</b> içeriğini veya canlı abonelik URL'sini ekleyin.</span>
              </li>
            </ol>
          </div>

          <a
            href="brave://settings/shields/filters"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-2"
          >
            <span>Brave Ayarlarını Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Method 2: Tampermonkey */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-xl relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="text-sm font-bold text-white">Tampermonkey / Violentmonkey</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dinamik DOM MutationObserver ve dondurma engelleme betiği ile en kararlı deneyim.
            </p>

            <ol className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Brave Mağazasından <b>Tampermonkey</b> eklentisini kurun.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><b>Userscript</b> sekmesindeki <b>Tek Tıkla Yükle</b> butonuna tıklayın.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Açılan onay sayfasında <b>Yükle (Install)</b> butonuna basın.</span>
              </li>
            </ol>
          </div>

          <a
            href="/raw/instagram-unblock.user.js"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-2"
          >
            <span>Userscript Yükle</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Method 3: Developer Extension */}
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-5 space-y-4 shadow-xl relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="text-sm font-bold text-white">Paketlenmemiş Uzantı (Unpacked)</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Kendi bağımsız Manifest V3 tarayıcı eklentinizi doğrudan Brave'e yükleyin.
            </p>

            <ol className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><b>Brave Eklentisi</b> sekmesinden ZIP dosyasını indirip klasöre çıkartın.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>Brave'de <code className="text-purple-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">chrome://extensions</code> açın.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>Sağ üstteki <b>Geliştirici modunu</b> açıp <b>Paketlenmemiş öge yükle</b> butonuna tıklayın.</span>
              </li>
            </ol>
          </div>

          <a
            href="chrome://extensions"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-2"
          >
            <span>Eklentiler Sayfasını Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
