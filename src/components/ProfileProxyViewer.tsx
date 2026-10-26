import React, { useState, useEffect } from 'react';
import { InstagramProfile, InstagramPost } from '../types';
import { Eye, Search, CheckCircle2, Heart, MessageCircle, ExternalLink, RefreshCw, AlertCircle, Share2, Download } from 'lucide-react';

export const ProfileProxyViewer: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState('cristiano');
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);

  const fetchProfile = async (targetUser: string) => {
    setLoading(true);
    setError('');
    try {
      const cleanUser = targetUser.replace('@', '').trim();
      const res = await fetch(`/api/instagram/profile?username=${encodeURIComponent(cleanUser)}`);
      const data = await res.json();
      if (data.success) {
        setProfile(data.profile);
      } else {
        setError('Profil bilgileri alınamadı.');
      }
    } catch (err: any) {
      setError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile('cristiano');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      fetchProfile(usernameInput);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Instagram Anonim Profil Önizleyici
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Giriş Yapmadan Profil & Gönderi İnceleme
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Herhangi bir Instagram kullanıcı adını yazın veya doğrudan bağlantı yapıştırın. Gönderileri, fotoğrafları, beğenileri ve açıklamaları hesap oluşturmadan görüntüleyin.
            </p>
          </div>

          {/* Quick Username Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => { setUsernameInput('cristiano'); fetchProfile('cristiano'); }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 rounded-lg transition"
            >
              @cristiano
            </button>
            <button
              onClick={() => { setUsernameInput('natgeo'); fetchProfile('natgeo'); }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 rounded-lg transition"
            >
              @natgeo
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-5 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Instagram kullanıcı adı veya profil linki yazın (örn: cristiano)"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{loading ? 'Yükleniyor...' : 'Profili Getir'}</span>
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Profile Card View */}
      {profile && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800/80 pb-6">
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-24 h-24 rounded-full border-2 border-slate-700 object-cover shadow-lg shrink-0"
            />

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  @{profile.username}
                  {profile.isVerified && <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />}
                </h3>

                <a
                  href={`https://www.instagram.com/${profile.username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-lg self-center sm:self-auto"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Instagram'da Aç</span>
                </a>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-6 text-xs text-slate-300 font-medium">
                <div>
                  <span className="font-bold text-white text-sm">{profile.postsCount}</span>
                  <span className="text-slate-400 ml-1">Gönderi</span>
                </div>
                <div>
                  <span className="font-bold text-white text-sm">{profile.followersCount}</span>
                  <span className="text-slate-400 ml-1">Takipçi</span>
                </div>
                <div>
                  <span className="font-bold text-white text-sm">{profile.followingCount}</span>
                  <span className="text-slate-400 ml-1">Takip</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed max-w-xl">
                <p className="font-semibold text-white">{profile.fullName}</p>
                <p className="text-slate-400 mt-0.5">{profile.biography}</p>
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tüm Gönderiler ({profile.posts.length})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {profile.posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="aspect-square bg-slate-950 rounded-xl overflow-hidden relative group cursor-pointer border border-slate-800/80 hover:border-sky-500/50 transition"
                >
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-white text-xs font-bold">
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-white" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4 fill-white" /> {post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Post Modal Detail */}
      {activePost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="md:w-1/2 bg-black flex items-center justify-center">
              <img
                src={activePost.mediaUrl}
                alt="Post"
                className="w-full h-auto max-h-[450px] object-contain"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <img
                    src={profile?.avatarUrl}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">@{profile?.username}</p>
                    <p className="text-[10px] text-slate-500">{activePost.timeAgo}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto">
                  {activePost.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-bold"><Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> {activePost.likes}</span>
                  <span className="flex items-center gap-1 font-bold"><MessageCircle className="w-4 h-4 text-sky-400" /> {activePost.comments}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activePost.mediaUrl}
                    target="_blank"
                    download="instagram-image.jpg"
                    rel="noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition"
                    title="Yüksek Çözünürlüklü Resmi İndir"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActivePost(null)}
                    className="px-4 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-700"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
