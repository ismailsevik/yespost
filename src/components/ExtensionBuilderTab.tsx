import React, { useState } from 'react';
import { EXTENSION_FILES } from '../data/filterData';
import { ExtensionFile } from '../types';
import JSZip from 'jszip';
import { Puzzle, Download, Copy, Check, FileText, Code2, Layers, CheckCircle2 } from 'lucide-react';

export const ExtensionBuilderTab: React.FC = () => {
  const [files, setFiles] = useState<ExtensionFile[]>(EXTENSION_FILES);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const activeFile = files[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContentChange = (newContent: string) => {
    const updated = [...files];
    updated[activeFileIndex] = { ...updated[activeFileIndex], content: newContent };
    setFiles(updated);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const extFolder = zip.folder('InstaShield-Brave-Extension');

      files.forEach((file) => {
        extFolder?.file(file.filename, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'InstaShield-Brave-Extension.zip';
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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Puzzle className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Brave & Chrome Manifest V3 Uzantı Paketi
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Brave Tarayıcı Eklentisi (Kaynak Kodu Paketleyici)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Herhangi bir ek filtre listesi veya Userscript yöneticisine ihtiyaç duymadan doğrudan Brave tarayıcısında
              <code className="text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded mx-1">chrome://extensions</code> üzerinde **Paketlenmemiş öge yükle** seçeneği ile kurabileceğiniz eksiksiz eklenti paketi.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-purple-500/20 transition flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'ZIP Hazırlanıyor...' : 'Eklenti Paketini İndir (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Code Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* File Tree Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 px-1">
            <Layers className="w-4 h-4 text-purple-400" /> Eklenti Dosyaları ({files.length})
          </h3>

          <div className="space-y-1">
            {files.map((file, idx) => {
              const isActive = activeFileIndex === idx;
              return (
                <button
                  key={file.filename}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition flex items-center justify-between ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-semibold shadow-inner'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 shrink-0 text-slate-500" />
                    <span className="truncate">{file.filename}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-sans shrink-0">{file.language}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2 px-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Manifest V3 Standart Uyumlu
            </div>
            <p className="leading-normal">
              İndirdiğiniz ZIP dosyasını klasöre çıkartın, Brave'de <code className="text-slate-300">chrome://extensions</code> açıp geliştirici modunda yükleyin.
            </p>
          </div>
        </div>

        {/* Code Editor View */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[450px]">
          {/* File Header */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono font-bold text-white">{activeFile.filename}</span>
              <span className="text-xs text-slate-400 font-sans hidden sm:inline">- {activeFile.description}</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>

          {/* Code Textarea Editor */}
          <textarea
            value={activeFile.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full flex-1 p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none min-h-[380px]"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
