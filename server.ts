import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json({ limit: '5mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Raw Filter List Endpoint for Brave Shields / uBlock Origin
app.get('/raw/filters.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const filters = `! Title: InstaShield Brave - Instagram No-Login Content Filters
! Description: Brave Shields & uBlock Origin rules to browse Instagram profiles without login
! Homepage: https://github.com/user/instashield-brave
! Version: 2.4.0
! Last Updated: ${new Date().toISOString().split('T')[0]}
! License: MIT

! === 1. ELEMENT HIDING FILTERS (DOM Overlays, Modals, Banners) ===
instagram.com##div[role="dialog"]:has(form[action*="login"])
instagram.com##div[role="dialog"]:has(a[href*="/accounts/login"])
instagram.com##div[role="presentation"]:has(a[href*="/accounts/emailsignup"])
instagram.com##div._a9--
instagram.com##div._a9_0
instagram.com##div._a9_1
instagram.com##div._a9_2
instagram.com##div[aria-labelledby*="login"]
instagram.com##div._ab8w._ab94._ab99._ab9f._ab9m._ab9p
instagram.com##div.x1n2onr6.x1vh22ee:has(a[href*="login"])
instagram.com##div.x78zum5.x1q0g3np.x1a02dak.x1qughmg
instagram.com##div[class*="x1n2onr6"]:has-text(Log In)
instagram.com##div[class*="x1n2onr6"]:has-text(Giriş Yap)
instagram.com##div[class*="x1n2onr6"]:has-text(Sign Up)
instagram.com##div[class*="x1n2onr6"]:has-text(Kaydol)
instagram.com##div[role="dialog"]:has-text(Log in to Instagram)
instagram.com##div[role="dialog"]:has-text(Instagram'a Giriş Yap)
instagram.com##div[role="dialog"]:has-text(See photos and videos from)
instagram.com##div[role="dialog"]:has-text(fotoğraf ve videolarını gör)

! === 2. BACKDROP & MASK HIDING ===
instagram.com##div._a8-7
instagram.com##div._a9-z
instagram.com##div[style*="background-color: rgba(0, 0, 0, 0.65)"]
instagram.com##div[style*="background-color: rgba(0, 0, 0, 0.8)"]
instagram.com##div[style*="backdrop-filter"]

! === 3. BOTTOM BANNER & FLOATING LOGIN FOOTER ===
instagram.com##div.x13vifvy:has(a[href*="login"])
instagram.com##div._ab8w._ab94._ab99._ab9f._ab9m:has(a[href*="accounts"])
instagram.com##div[aria-label="Bottom Banner"]
instagram.com##footer._a9-v

! === 4. PROCEDURAL STYLE OVERRIDES (UNLOCK SCROLL) ===
instagram.com##html:style(overflow: auto !important; position: static !important; top: auto !important;)
instagram.com##body:style(overflow: auto !important; position: static !important; top: auto !important; pointer-events: auto !important;)
instagram.com##div[style*="overflow: hidden"]:style(overflow: auto !important;)

! === 5. MEDIA & CLICKABILITY RESTORATION ===
instagram.com##a[href*="/p/"]:style(pointer-events: auto !important;)
instagram.com##a[href*="/reel/"]:style(pointer-events: auto !important;)
instagram.com##div._aagw:style(display: none !important;)

! === 6. TELEMETRY & REDIRECT TRAPPING BLOCKS ===
||instagram.com/ajax/bz$xhr,domain=instagram.com
||instagram.com/api/v1/web/fxcal/$xhr,domain=instagram.com
`;
  res.send(filters);
});

// Raw Userscript Endpoint
app.get('/raw/instagram-unblock.user.js', (req, res) => {
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const userScript = `// ==UserScript==
// @name         InstaShield Brave - Instagram No-Login Profile Viewer
// @namespace    https://github.com/user/instashield-brave
// @version      2.4.0
// @description  Brave Browser script to bypass Instagram login modals and unlock scrolling without an account.
// @author       InstaShield Team
// @match        https://www.instagram.com/*
// @match        https://instagram.com/*
// @icon         https://www.instagram.com/favicon.ico
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const styleText = \`
    html, body {
      overflow: auto !important;
      position: static !important;
      height: auto !important;
      max-height: none !important;
      pointer-events: auto !important;
    }

    div[role="dialog"]:has(form[action*="login"]),
    div[role="dialog"]:has(a[href*="/accounts/login"]),
    div[role="dialog"]:has(a[href*="/accounts/emailsignup"]),
    div._a9--, div._a9_0, div._a9_1, div._a9_2,
    div[aria-labelledby*="login"],
    div[style*="background-color: rgba(0, 0, 0, 0.65)"],
    div[style*="background-color: rgba(0, 0, 0, 0.8)"],
    div[aria-label="Bottom Banner"],
    footer._a9-v {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    a[href*="/p/"], a[href*="/reel/"] {
      pointer-events: auto !important;
      cursor: pointer !important;
    }

    div._aagw {
      display: none !important;
    }
  \`;

  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(styleText);
  } else {
    const style = document.createElement('style');
    style.textContent = styleText;
    (document.head || document.documentElement).appendChild(style);
  }

  function cleanupInstagramLocks() {
    if (document.body) {
      document.body.style.setProperty('overflow', 'auto', 'important');
      document.body.style.setProperty('position', 'static', 'important');
    }
    if (document.documentElement) {
      document.documentElement.style.setProperty('overflow', 'auto', 'important');
    }

    const dialogs = document.querySelectorAll('div[role="dialog"], div[role="presentation"]');
    dialogs.forEach(dialog => {
      const text = dialog.textContent || '';
      if (
        text.includes('Log In') ||
        text.includes('Giriş Yap') ||
        text.includes('Sign Up') ||
        text.includes('Kaydol') ||
        text.includes('See photos and videos') ||
        text.includes('fotoğraf ve videolarını gör') ||
        dialog.querySelector('a[href*="login"]') ||
        dialog.querySelector('form')
      ) {
        dialog.remove();
      }
    });

    const backdrops = document.querySelectorAll('div[style*="rgba(0, 0, 0"]');
    backdrops.forEach(b => {
      if (b.offsetWidth >= window.innerWidth * 0.9 && b.offsetHeight >= window.innerHeight * 0.9) {
        b.remove();
      }
    });
  }

  const observer = new MutationObserver(cleanupInstagramLocks);

  window.addEventListener('DOMContentLoaded', () => {
    cleanupInstagramLocks();
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  });

  const originalAssign = window.location.assign;
  window.location.assign = function (url) {
    if (typeof url === 'string' && url.includes('/accounts/login')) {
      console.log('[InstaShield] Blocked redirect to login page:', url);
      return;
    }
    return originalAssign.apply(this, arguments);
  };
})();
`;
  res.send(userScript);
});

// Gemini AI API Route to analyze HTML snippet or popup code and generate Brave filter rule
app.post('/api/gemini/optimize-rules', async (req, res) => {
  try {
    const { htmlSnippet, description } = req.body;
    if (!ai) {
      return res.status(500).json({
        error: 'Gemini API key is missing. Please set GEMINI_API_KEY in environment or secrets.'
      });
    }

    const prompt = `You are a Brave Browser content filter & uBlock Origin expert.
Analyze the following Instagram HTML DOM snippet or issue description, and produce targeted content filter rules for Brave Shields / uBlock Origin and JavaScript snippet mutations.

User Description / Snippet:
${description || 'Instagram login wall popup or dynamic DOM backdrop.'}

HTML Snippet:
${htmlSnippet || '<div class="_a9--">Log in to view posts</div>'}

Instructions:
1. Provide valid Brave Shields / uBlock Origin procedural cosmetic syntax (e.g., instagram.com##selector or instagram.com##selector:style(...)).
2. Provide a JavaScript MutationObserver / CSS snippet for Tampermonkey.
3. Provide a short explanation in Turkish and English of why this element blocks viewing and how the rule bypasses it.

Respond in structured JSON format with fields:
{
  "adblockRules": ["instagram.com##..."],
  "userscriptSnippet": "// ...",
  "explanationTr": "...",
  "explanationEn": "..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text;
    const parsed = JSON.parse(resultText || '{}');
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error('Gemini Optimization Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to optimize rules using Gemini AI.' });
  }
});

// Public Instagram Mock Proxy/Info Search Endpoint
app.get('/api/instagram/profile', (req, res) => {
  const username = String(req.query.username || 'instagram').replace('@', '').trim().toLowerCase();
  
  // Return realistic mock profile metadata & mock posts for demo sandbox viewer
  const profilesDatabase: Record<string, any> = {
    'cristiano': {
      username: 'cristiano',
      fullName: 'Cristiano Ronaldo',
      biography: 'SIUUU! ⚽️ Living my dream with Al Nassr & Portugal.',
      avatarUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=300&fit=crop',
      isVerified: true,
      postsCount: '3,842',
      followersCount: '642M',
      followingCount: '580',
      posts: [
        {
          id: 'post_c1',
          mediaUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=800&fit=crop',
          likes: '8.4M',
          comments: '42.1K',
          caption: 'Great win last night! Ready for the next match 🇵🇹⚽️ #CR7 #Siuuu',
          type: 'image',
          timeAgo: '2 hours ago'
        },
        {
          id: 'post_c2',
          mediaUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&h=800&fit=crop',
          likes: '6.1M',
          comments: '29.3K',
          caption: 'Training session complete! Focus on the goal 💪',
          type: 'image',
          timeAgo: '1 day ago'
        },
        {
          id: 'post_c3',
          mediaUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop',
          likes: '11.2M',
          comments: '95.4K',
          caption: 'Family time is the best time ❤️',
          type: 'image',
          timeAgo: '3 days ago'
        },
        {
          id: 'post_c4',
          mediaUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=800&fit=crop',
          likes: '5.9M',
          comments: '18.7K',
          caption: 'New partnership announcement coming soon Stay tuned ⏳',
          type: 'image',
          timeAgo: '5 days ago'
        },
        {
          id: 'post_c5',
          mediaUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&h=800&fit=crop',
          likes: '9.8M',
          comments: '51.0K',
          caption: 'Hard work always pays off! Keep pushing 🔥',
          type: 'image',
          timeAgo: '1 week ago'
        },
        {
          id: 'post_c6',
          mediaUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=800&fit=crop',
          likes: '7.3M',
          comments: '31.2K',
          caption: 'Unforgettable stadium energy! Thank you fans 🙌',
          type: 'image',
          timeAgo: '2 weeks ago'
        }
      ]
    },
    'natgeo': {
      username: 'natgeo',
      fullName: 'National Geographic',
      biography: 'Inspiring people to care about the planet since 1888 🌍📸',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
      isVerified: true,
      postsCount: '29,481',
      followersCount: '284M',
      followingCount: '142',
      posts: [
        {
          id: 'post_ng1',
          mediaUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
          likes: '412K',
          comments: '1.8K',
          caption: 'Photo by @wildlife_photographer: Misty sunrise over Northern Norway fjords. Nature in its purest form. 🏔️✨',
          type: 'image',
          timeAgo: '4 hours ago'
        },
        {
          id: 'post_ng2',
          mediaUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?w=800&h=800&fit=crop',
          likes: '620K',
          comments: '3.4K',
          caption: 'Giant pandas in Chengdu Sanctuary preparing for autumn bamboo harvest. 🐼🎋',
          type: 'image',
          timeAgo: '12 hours ago'
        },
        {
          id: 'post_ng3',
          mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
          likes: '890K',
          comments: '4.1K',
          caption: 'Crystal clear turquoise water off the coast of Maldives. Marine biodiversity conservation is vital.',
          type: 'image',
          timeAgo: '1 day ago'
        },
        {
          id: 'post_ng4',
          mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=800&fit=crop',
          likes: '340K',
          comments: '1.2K',
          caption: 'An ancient temple hidden deep inside the jungles of Southeast Asia.',
          type: 'image',
          timeAgo: '2 days ago'
        },
        {
          id: 'post_ng5',
          mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=800&fit=crop',
          likes: '780K',
          comments: '2.9K',
          caption: 'Majestic peaks of the Swiss Alps bathed in golden hour light.',
          type: 'image',
          timeAgo: '4 days ago'
        },
        {
          id: 'post_ng6',
          mediaUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=800&fit=crop',
          likes: '510K',
          comments: '2.1K',
          caption: 'Cinque Terre coast line in Italy. Architecture harmonizing with cliffs.',
          type: 'image',
          timeAgo: '1 week ago'
        }
      ]
    }
  };

  const genericProfile = profilesDatabase[username] || {
    username: username,
    fullName: username.charAt(0).toUpperCase() + username.slice(1) + ' (Public Profile)',
    biography: `Instagram public content view for @${username}. Loaded without login via Brave Shields rules.`,
    avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop`,
    isVerified: false,
    postsCount: '142',
    followersCount: '12.5K',
    followingCount: '340',
    posts: [
      {
        id: `post_${username}_1`,
        mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop',
        likes: '1.2K',
        comments: '84',
        caption: `Exploring new horizons with @${username}! Pure scenic views 🌲✨`,
        type: 'image',
        timeAgo: '1 hour ago'
      },
      {
        id: `post_${username}_2`,
        mediaUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=800&fit=crop',
        likes: '3.4K',
        comments: '150',
        caption: 'Photography vibes and city aesthetics. Unlocked via Brave content filter rules!',
        type: 'image',
        timeAgo: '5 hours ago'
      },
      {
        id: `post_${username}_3`,
        mediaUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop',
        likes: '980',
        comments: '42',
        caption: 'Night skies and starry nights over the mountains. ✨🌌',
        type: 'image',
        timeAgo: '1 day ago'
      },
      {
        id: `post_${username}_4`,
        mediaUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=800&fit=crop',
        likes: '2.1K',
        comments: '91',
        caption: 'Roadtrip memories. No Instagram login modal popped up! 🚙💨',
        type: 'image',
        timeAgo: '3 days ago'
      },
      {
        id: `post_${username}_5`,
        mediaUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop',
        likes: '4.5K',
        comments: '210',
        caption: 'Golden valley landscape. Seamless scroll restored.',
        type: 'image',
        timeAgo: '5 days ago'
      },
      {
        id: `post_${username}_6`,
        mediaUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=800&fit=crop',
        likes: '1.8K',
        comments: '77',
        caption: 'Deep forest walk. Nature therapy for the soul.',
        type: 'image',
        timeAgo: '1 week ago'
      }
    ]
  };

  res.json({ success: true, profile: genericProfile });
});

// Serve Vite in development
if (process.env.NODE_ENV !== 'production') {
  import('vite').then(async (vite) => {
    const viteServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(viteServer.middlewares);
    
    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/raw')) {
        return next();
      }
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await viteServer.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        viteServer.ssrFixStacktrace(e);
        next(e);
      }
    });
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`InstaShield Brave server running on port ${PORT}`);
});
