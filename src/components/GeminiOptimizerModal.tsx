import React, { useState } from 'react';
import { Sparkles, X, Code, Check, Copy, AlertCircle, RefreshCw } from 'lucide-react';
import { GeminiOptimizationResult } from '../types';

interface GeminiOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiOptimizerModal: React.FC<GeminiOptimizerModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [htmlSnippet, setHtmlSnippet] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiOptimizationResult | null>(null);
  const [error, setError] = useState('');
  const [copiedRule, setCopiedRule] = useState(false);

  if (!isOpen) return null;

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/gemini/optimize-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, htmlSnippet }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || 'Gemini kural üretemedi.');
      }
    } catch (err: any) {
      setError('Gemini servisine bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRules = () => {
    if (result?.adblockRules) {
      navigator.clipboard.writeText(result.adblockRules.join('\n'));
      setCopiedRule(true);
      setTimeout(() => setCopiedRule(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gemini AI Kural Eniyileştirici</h3>
              <p className="text-xs text-slate-400">Instagram HTML kodunu yapıştırın, yapay zeka özel Brave kuralı üretsin</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleOptimize} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Sorun Açıklaması veya Yeni Instagram Değişikliği:
            </label>
            <input
              type="text"
              placeholder="Örn: Yeni gelen Instagram diyalog kutusu sayfa kaydırmayı donduruyor"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Instagram HTML / DOM Kodu (Öğeyi İncele'den Kopyalanan HTML):
            </label>
            <textarea
              rows={4}
              placeholder="Örn: <div class='_a9-- _a9_0'><form action='/accounts/login'>...</form></div>"
              value={htmlSnippet}
              onChange={(e) => setHtmlSnippet(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Gemini Kural Üretiyor...' : 'Gemini AI İle Kuralları Üret'}</span>
          </button>
        </form>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Generated Result */}
        {result && (
          <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Üretilen Brave Shields Filtre Kuralları:
              </span>
              <button
                onClick={handleCopyRules}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700 transition flex items-center gap-1"
              >
                {copiedRule ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRule ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <pre className="p-3 bg-slate-900 text-amber-300 text-xs font-mono rounded-lg overflow-x-auto leading-relaxed">
              {result.adblockRules.join('\n')}
            </pre>

            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-slate-200">Açıklama:</p>
              <p className="text-slate-400">{result.explanationTr}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
