import React, { useState } from 'react';
import { FilterRuleItem } from '../types';
import { DEFAULT_FILTER_RULES, FULL_FILTERS_TXT } from '../data/filterData';
import { Shield, Copy, Check, Search, Plus, ExternalLink, Download, AlertCircle, Info } from 'lucide-react';

interface FilterListTabProps {
  onOpenGeminiModal: () => void;
}

export const FilterListTab: React.FC<FilterListTabProps> = ({ onOpenGeminiModal }) => {
  const [rules, setRules] = useState<FilterRuleItem[]>(DEFAULT_FILTER_RULES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedRuleId, setCopiedRuleId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // New Rule Input State
  const [newRuleText, setNewRuleText] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newRuleCat, setNewRuleCat] = useState<'modal' | 'backdrop' | 'style' | 'network' | 'footer'>('modal');
  const [isAddingRule, setIsAddingRule] = useState(false);

  const rawFiltersUrl = `${window.location.origin}/raw/filters.txt`;

  const categories = [
    { id: 'all', label: 'Tüm Kurallar' },
    { id: 'modal', label: 'Popup & Modaller' },
    { id: 'backdrop', label: 'Karanlık Maskeler' },
    { id: 'style', label: 'Kaydırma Kilidi Çözücü' },
    { id: 'footer', label: 'Alt Çubuklar' },
    { id: 'network', label: 'Ağ & Telemetri' },
  ];

  const filteredRules = rules.filter((r) => {
    const matchesSearch =
      r.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.descriptionTr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyRule = (rule: string, id: string) => {
    navigator.clipboard.writeText(rule);
    setCopiedRuleId(id);
    setTimeout(() => setCopiedRuleId(null), 2000);
  };

  const handleCopyAllFilters = () => {
    const textToCopy = rules.map((r) => r.rule).join('\n');
    navigator.clipboard.writeText(FULL_FILTERS_TXT || textToCopy);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(rawFiltersUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([FULL_FILTERS_TXT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filters.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleText.trim()) return;
    const newItem: FilterRuleItem = {
      id: `custom_${Date.now()}`,
      category: newRuleCat,
      rule: newRuleText.trim(),
      descriptionTr: newRuleDesc.trim() || 'Özel eklenen Brave filtresi',
      descriptionEn: 'Custom added filter rule',
      isCustom: true,
    };
    setRules([newItem, ...rules]);
    setNewRuleText('');
    setNewRuleDesc('');
    setIsAddingRule(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-orange-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Brave Shields & uBlock Origin İçerik Filtresi
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Brave İçerik Filtreleme Kuralları (<code className="text-orange-300 bg-orange-950/60 px-2 py-0.5 rounded text-lg">filters.txt</code>)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Instagram'ın giriş yapma uyarılarını, arka plan karartmalarını ve sayfa dondurmalarını engelleyen
              Brave Shields uyumlu içerik filtreleri. Bu kuralları kopyalayıp Brave tarayıcınıza yapıştırabilir veya canlı abonelik URL'si ekleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAllFilters}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium text-xs shadow-lg shadow-orange-500/20 transition flex items-center gap-2"
            >
              {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'Kopyalandı!' : 'Tüm Filtreleri Kopyala'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>filters.txt İndir</span>
            </button>
          </div>
        </div>

        {/* Live Subscription URL Box */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300 overflow-hidden">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-medium shrink-0">Brave Shields Canlı Abonelik Linki:</span>
            <code className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded font-mono text-[11px] truncate">
              {rawFiltersUrl}
            </code>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyUrl}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 rounded-lg transition flex items-center gap-1.5"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Kopyalandı' : 'URL Kopyala'}</span>
            </button>
            <a
              href="/raw/filters.txt"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
              title="Ham Filtre Listesini Aç"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Search and Category Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Add Rule */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtre veya açıklama ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
            />
          </div>

          <button
            onClick={() => setIsAddingRule(!isAddingRule)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 text-orange-400" />
            <span>Kural Ekle</span>
          </button>
        </div>
      </div>

      {/* Add Custom Rule Form Modal */}
      {isAddingRule && (
        <form onSubmit={handleAddRule} className="bg-slate-900 border border-orange-500/30 rounded-2xl p-4 space-y-3 shadow-lg">
          <h3 className="text-xs font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4" /> Özel Brave İçerik Filtresi Ekle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Filtre Kuralı (örn: instagram.com##div._a9--)"
              value={newRuleText}
              onChange={(e) => setNewRuleText(e.target.value)}
              required
              className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-orange-500"
            />
            <select
              value={newRuleCat}
              onChange={(e: any) => setNewRuleCat(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-orange-500"
            >
              <option value="modal">Popup & Modaller</option>
              <option value="backdrop">Karanlık Maskeler</option>
              <option value="style">Kaydırma Kilidi Çözücü</option>
              <option value="footer">Alt Çubuklar</option>
              <option value="network">Ağ & Telemetri</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Kural Açıklaması (Opsiyonel)"
              value={newRuleDesc}
              onChange={(e) => setNewRuleDesc(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition"
            >
              Ekle
            </button>
            <button
              type="button"
              onClick={() => setIsAddingRule(false)}
              className="px-3 py-2 bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-medium transition"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Rules Table / Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Toplam {filteredRules.length} Filtre Kuralı Listeleniyor
          </span>
          <span className="text-[11px] text-slate-400">
            Tıklayarak bireysel kuralları kopyalayabilirsiniz
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {filteredRules.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-slate-800/40 transition flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-amber-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 break-all select-all">
                    {item.rule}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-md uppercase border ${
                      item.category === 'modal'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : item.category === 'backdrop'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : item.category === 'style'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : item.category === 'footer'
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {item.category}
                  </span>
                  {item.isCustom && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">
                      Özel
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.descriptionTr}
                </p>
              </div>

              <button
                onClick={() => handleCopyRule(item.rule, item.id)}
                className="self-start md:self-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition flex items-center gap-1.5 shrink-0 opacity-90 group-hover:opacity-100"
              >
                {copiedRuleId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
          ))}

          {filteredRules.length === 0 && (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs">Aramanızla eşleşen içerik filtresi bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
