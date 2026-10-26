import React, { useState } from 'react';
import { Play, Shield, Zap, Lock, Unlock, Eye, Sparkles, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LiveSimulatorTab: React.FC = () => {
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [scriptEnabled, setScriptEnabled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const isBypassed = filterEnabled || scriptEnabled;

  const mockPosts = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&h=600&fit=crop',
      likes: '14.2K',
      comments: '320',
      caption: 'Sunset vibes over Istanbul skyline 🌅 #Istanbul #Photography'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop',
      likes: '28.1K',
      comments: '890',
      caption: 'Deep in the green forest trails. Unlocked without log in!'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop',
      likes: '9.4K',
      comments: '180',
      caption: 'Night sky galaxy shot in the mountains 🏔️✨'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop',
      likes: '45.3K',
      comments: '1.2K',
      caption: 'Urban photography & street architecture.'
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop',
      likes: '18.9K',
      comments: '540',
      caption: 'Roadtrip scenic coastlines and winding roads.'
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=600&fit=crop',
      likes: '31.0K',
      comments: '730',
      caption: 'Golden hour lights in the valley.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5 text-pink-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                İnteraktif Filtre Test Simülatörü
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Brave Filtre Kurallarının Çalışma Mantığını Test Edin
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Aşağıdaki sanal Instagram profilinde Brave İçerik Filtresini ve Userscript motorunu **AÇIK / KAPALI** konuma getirerek Instagram'ın kilit modal'larının ve kaydırma engellerinin nasıl engellendiğini anında gözlemleyin.
            </p>
          </div>

          {/* Controls Panel */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Shield className="w-4 h-4 text-orange-400" />
                <span>Brave Content Filter</span>
              </div>
              <button
                onClick={() => setFilterEnabled(!filterEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  filterEnabled ? 'bg-orange-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    filterEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Userscript Engine</span>
              </div>
              <button
                onClick={() => setScriptEnabled(!scriptEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  scriptEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    scriptEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Frame */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Simulator Bar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs font-mono text-slate-400 ml-2">
              https://www.instagram.com/instagram_demo/
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isBypassed ? (
              <span className="px-2.5 py-1 text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> GİRİŞ ENGELİ KALDIRILDI
              </span>
            ) : (
              <span className="px-2.5 py-1 text-[11px] bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg flex items-center gap-1 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" /> GİRİŞ DUVARI AKTİF
              </span>
            )}
          </div>
        </div>

        {/* Mock Instagram Body Container */}
        <div
          onScroll={() => setHasScrolled(true)}
          className={`p-6 max-h-[500px] overflow-y-auto relative transition-all ${
            !isBypassed && hasScrolled ? 'select-none pointer-events-none' : ''
          }`}
        >
          {/* Instagram Profile Header */}
          <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-gradient ring-2 ring-pink-500/40 object-cover"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-white">instagram_demo</h3>
                <span className="px-2 py-0.5 text-[10px] bg-sky-500/20 text-sky-400 rounded-full font-semibold">
                  Doğrulanmış Profil
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span><b>142</b> gönderi</span>
                <span><b>1.2M</b> takipçi</span>
                <span><b>340</b> takip</span>
              </div>
              <p className="text-xs text-slate-400">
                Brave Shields içerik filtresi ile anonim olarak incelenen Instagram demo profili.
              </p>
            </div>
          </div>

          {/* Grid Photos */}
          <div className="mt-6 space-y-3">
            <p className="text-xs text-slate-400 font-medium">
              Görselleri tıklayın veya aşağı kaydırın (Giriş yapmadan tüm akış açılır):
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mockPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="aspect-square bg-slate-950 rounded-xl overflow-hidden relative group cursor-pointer border border-slate-800 hover:border-orange-500/50 transition"
                >
                  <img
                    src={post.url}
                    alt="Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-white text-xs font-bold">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIMULATED LOGIN MODAL POPUP (Shows ONLY if NOT bypassed and user scrolled) */}
          {!isBypassed && hasScrolled && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-30 animate-fade-in">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
                <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Devam Etmek İçin Giriş Yapın</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Instagram'daki fotoğraf ve videoları görmeye devam etmek için giriş yapmanız veya hesap oluşturmanız gerekiyor.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold">
                    Giriş Yap (Instagram)
                  </button>
                  <button className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium">
                    Kaydol
                  </button>
                </div>

                <p className="text-[11px] text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  👉 Bu popup'ı kaldırmak için yukarıdaki <b>Brave Content Filter</b> veya <b>Userscript Engine</b> butonunu AÇIK yapın!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Post Modal Preview */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
            <img
              src={selectedPost.url}
              alt="Post Detail"
              className="w-full md:w-1/2 aspect-square object-cover"
            />
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white">
                    ID
                  </div>
                  <span className="text-xs font-bold text-white">instagram_demo</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedPost.caption}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  ❤️ {selectedPost.likes} • 💬 {selectedPost.comments}
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-700"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
