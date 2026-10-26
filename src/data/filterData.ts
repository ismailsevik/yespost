import { FilterRuleItem, ExtensionFile } from '../types';

export const DEFAULT_FILTER_RULES: FilterRuleItem[] = [
  {
    id: 'f1',
    category: 'modal',
    rule: 'instagram.com##div[role="dialog"]:has(form[action*="login"])',
    descriptionTr: 'Giriş yapma formunu içeren Instagram modal penceresini gizler.',
    descriptionEn: 'Hides Instagram login form modal popup.'
  },
  {
    id: 'f2',
    category: 'modal',
    rule: 'instagram.com##div[role="dialog"]:has(a[href*="/accounts/login"])',
    descriptionTr: 'Giriş bağlantısı barındıran tüm diyalog pencerelerini engeller.',
    descriptionEn: 'Blocks all dialog windows containing login links.'
  },
  {
    id: 'f3',
    category: 'modal',
    rule: 'instagram.com##div._a9--',
    descriptionTr: 'Instagram ana popup kapsayıcısı (hesap oluştur / giriş yap uyarısı).',
    descriptionEn: 'Main Instagram popup overlay wrapper.'
  },
  {
    id: 'f4',
    category: 'backdrop',
    rule: 'instagram.com##div._a8-7',
    descriptionTr: 'Sayfanın üzerini kaplayan yarı saydam karanlık arka plan katmanını siler.',
    descriptionEn: 'Removes the translucent dark backdrop mask overlaying the page.'
  },
  {
    id: 'f5',
    category: 'backdrop',
    rule: 'instagram.com##div[style*="background-color: rgba(0, 0, 0, 0.65)"]',
    descriptionTr: 'Sayfayı tıklanamaz hale getiren %65 opaklıktaki maskeyi gizler.',
    descriptionEn: 'Hides the 65% opacity unclickable mask.'
  },
  {
    id: 'f6',
    category: 'style',
    rule: 'instagram.com##html:style(overflow: auto !important; position: static !important;)',
    descriptionTr: 'HTML etiketine uygulanan kaydırma kilidini (overflow: hidden) kaldırır.',
    descriptionEn: 'Unlocks page scroll on HTML element.'
  },
  {
    id: 'f7',
    category: 'style',
    rule: 'instagram.com##body:style(overflow: auto !important; pointer-events: auto !important;)',
    descriptionTr: 'Body etiketindeki dondurmayı çözer, kaydırma ve tıklamayı aktif eder.',
    descriptionEn: 'Unfreezes document body, restoring scroll and clicks.'
  },
  {
    id: 'f8',
    category: 'footer',
    rule: 'instagram.com##div[aria-label="Bottom Banner"]',
    descriptionTr: 'Alt kısımda yapışan "Daha fazla fotoğraf için kaydolun" çubuğunu gizler.',
    descriptionEn: 'Hides the sticky bottom sign-up promotion banner.'
  },
  {
    id: 'f9',
    category: 'modal',
    rule: 'instagram.com##div[role="dialog"]:has-text(See photos and videos from)',
    descriptionTr: '"... profilinin fotoğraf ve videolarını gör" açılır penceresini engeller.',
    descriptionEn: 'Blocks "See photos and videos from..." popups.'
  },
  {
    id: 'f10',
    category: 'modal',
    rule: 'instagram.com##div[role="dialog"]:has-text(fotoğraf ve videolarını gör)',
    descriptionTr: 'Türkçe "fotoğraf ve videolarını gör" diyalog kutularını gizler.',
    descriptionEn: 'Hides Turkish language login overlay popups.'
  },
  {
    id: 'f11',
    category: 'style',
    rule: 'instagram.com##div._aagw:style(display: none !important;)',
    descriptionTr: 'Görsellerin üzerindeki görünmez şeffaf tıklama engelleyici katmanı kaldırır.',
    descriptionEn: 'Removes invisible overlay blocking photo clicks.'
  },
  {
    id: 'f12',
    category: 'network',
    rule: '||instagram.com/ajax/bz$xhr,domain=instagram.com',
    descriptionTr: 'Oturum kontrolü yapan telemetry ve bz yönlendirmeisteklerini engeller.',
    descriptionEn: 'Blocks telemetry and login checking AJAX calls.'
  }
];

export const FULL_FILTERS_TXT = `! Title: InstaShield Brave - Instagram No-Login Content Filters
! Description: Brave Shields & uBlock Origin filter rules to view Instagram profiles without login
! Homepage: https://github.com/user/instashield-brave
! License: MIT
! Version: 2.4.0
! Last Updated: 2026-10-26

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

export const FULL_USERSCRIPT_JS = `// ==UserScript==
// @name         InstaShield Brave - Instagram No-Login Profile Viewer
// @namespace    https://github.com/user/instashield-brave
// @version      2.4.0
// @description  Removes Instagram login dialogs, unlocks scrolling, enables post clicks and high-res media viewing without an account on Brave Browser.
// @author       InstaShield Team
// @match        https://www.instagram.com/*
// @match        https://instagram.com/*
// @icon         https://www.instagram.com/favicon.ico
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  // Inject CSS style overrides immediately before DOM render
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

  // Active DOM Observer to cleanup dynamically injected login modals
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

  // Intercept forced location redirect to login screen
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

export const EXTENSION_FILES: ExtensionFile[] = [
  {
    filename: 'manifest.json',
    language: 'json',
    description: 'Manifest V3 configuration for Brave Browser and Chrome.',
    content: `{
  "manifest_version": 3,
  "name": "InstaShield Brave - Instagram No-Login Viewer",
  "version": "2.4.0",
  "description": "Brave Browser extension to browse Instagram profiles and posts without logging in or creating an account.",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "InstaShield Brave Status"
  },
  "content_scripts": [
    {
      "matches": ["https://*.instagram.com/*"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_start"
    }
  ],
  "permissions": [
    "storage"
  ],
  "host_permissions": [
    "https://*.instagram.com/*"
  ]
}`
  },
  {
    filename: 'content.js',
    language: 'javascript',
    description: 'High-speed DOM mutation watcher that strips login overlays and restores page scrolling.',
    content: `// InstaShield Brave Extension Content Script
console.log('[InstaShield Brave] Active on Instagram page.');

function purgeLoginWalls() {
  // Unlock scroll
  if (document.body) {
    document.body.style.setProperty('overflow', 'auto', 'important');
    document.body.style.setProperty('position', 'static', 'important');
  }
  if (document.documentElement) {
    document.documentElement.style.setProperty('overflow', 'auto', 'important');
  }

  // Find & destroy modal dialogs
  const modals = document.querySelectorAll('div[role="dialog"], div._a9--, div[role="presentation"]');
  modals.forEach(modal => {
    const txt = modal.innerText || '';
    if (
      txt.includes('Log In') || txt.includes('Giriş Yap') ||
      txt.includes('Sign Up') || txt.includes('Kaydol') ||
      modal.querySelector('a[href*="login"]')
    ) {
      modal.style.setProperty('display', 'none', 'important');
      modal.remove();
    }
  });

  // Remove translucent overlays
  const overlays = document.querySelectorAll('div[style*="rgba(0, 0, 0"]');
  overlays.forEach(overlay => {
    if (overlay.offsetWidth >= window.innerWidth * 0.8) {
      overlay.style.setProperty('display', 'none', 'important');
      overlay.remove();
    }
  });
}

// Observe mutations continuously
const observer = new MutationObserver(purgeLoginWalls);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['style', 'class']
});

document.addEventListener('DOMContentLoaded', purgeLoginWalls);
`
  },
  {
    filename: 'styles.css',
    language: 'css',
    description: 'CSS rules injected at document start to guarantee modals never flicker.',
    content: `/* InstaShield Injected CSS */
html, body {
  overflow: auto !important;
  position: static !important;
  pointer-events: auto !important;
}

div[role="dialog"]:has(form[action*="login"]),
div[role="dialog"]:has(a[href*="/accounts/login"]),
div._a9--, div._a9_0, div._a9_1,
div[style*="background-color: rgba(0, 0, 0, 0.65)"],
div[aria-label="Bottom Banner"],
footer._a9-v {
  display: none !important;
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
`
  },
  {
    filename: 'popup.html',
    language: 'json',
    description: 'Extension popup status menu UI.',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      width: 260px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 16px;
      background: #0f172a;
      color: #f8fafc;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .badge {
      background: #10b981;
      color: #022c22;
      font-size: 11px;
      font-weight: bold;
      padding: 3px 8px;
      border-radius: 12px;
    }
    .status {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="header">
    <strong style="font-size:15px;">InstaShield Brave</strong>
    <span class="badge">ACTIVE</span>
  </div>
  <p class="status">Instagram login modal bypass and scroll unlocker is enabled.</p>
</body>
</html>`
  },
  {
    filename: 'README.md',
    language: 'markdown',
    description: 'Quick installation guide for developer mode in Brave Browser.',
    content: `# InstaShield Brave Extension

## Quick Installation in Brave Browser:
1. Open Brave and go to \`chrome://extensions/\`
2. Enable **Developer mode** toggle in top-right corner.
3. Click **Load unpacked**.
4. Select this folder!
5. Open any Instagram profile (e.g. \`https://www.instagram.com/cristiano/\`) without logging in!
`
  }
];

export const GITHUB_README_MD = `# 🛡️ InstaShield Brave - Instagram No-Login Content Filter & Unblocker

![Brave Shields Compatible](https://img.shields.io/badge/Brave%20Shields-Compatible-ff1a1a?style=for-the-badge&logo=brave&logoColor=white)
![uBlock Origin](https://img.shields.io/badge/uBlock%20Origin-Supported-800000?style=for-the-badge&logo=ublockorigin&logoColor=white)
![Tampermonkey](https://img.shields.io/badge/Userscript-Tampermonkey-00b894?style=for-the-badge&logo=tampermonkey&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

Brave Browser ve uBlock Origin kullanıcıları için **İnstagram profillerini hesap oluşturmadan veya giriş yapmadan** tüm gönderileriyle birlikte kesintisiz incelemeyi sağlayan açık kaynaklı içerik filtreleme kuralları, Userscript ve Eklenti paketi.

---

## 🚀 Özellikler (Features)

- 🚫 **Giriş Duvarlarını ve Popup'ları Engeller**: "Giriş Yap", "Hesap Oluştur", "Fotoğraflarını ve videolarını gör" açılır pencerelerini tamamen yok eder.
- 🔓 **Sayfa Kaydırma Kilidini Çözer**: Instagram'ın \`overflow: hidden\` kısıtlamasını kaldırarak profil akışını sonsuza dek kaydırmanızı sağlar.
- 🖼️ **Gönderi Tıklama ve Yüksek Çözünürlüklü Medya**: Görsellerin üzerindeki görünmez engelleyici katmanları (\`_aagw\`) kaldırarak fotoğraflara doğrudan erişim sunar.
- ⚡ **Brave Shields Entegrasyonu**: Herhangi bir eklenti kurmadan doğrudan \`brave://settings/shields/filters\` alanına ekleyebilirsiniz.
- 🛡️ **Tampermonkey / Violentmonkey Desteği**: Dinamik DOM izleyicisi ile sayfa yenilenmeden açılan pop-up'ları anında temizler.

---

## 🛠️ Kurulum Yöntemleri (Installation Methods)

### Yöntem 1: Brave Shields Özel İçerik Filtresi (Tavsiye Edilen)
1. Brave tarayıcınızda adres çubuğuna \`brave://settings/shields/filters\` yazın ve **Enter**'a basın.
2. **Özel Filtre Ekle** (Create custom filters) kutusuna gelin.
3. Bu depodaki [filters.txt](./filters.txt) dosyasının içeriğini yapıştırın veya aşağıdaki ham URL'yi abonelik listesi olarak ekleyin:
   \`\`\`text
   https://raw.githubusercontent.com/user/instashield-brave/main/filters.txt
   \`\`\`
4. **Kaydet** butonuna basın. Instagram sayfalarını yenileyin!

---

### Yöntem 2: Tampermonkey / Violentmonkey Kullanıcı Betiği (Userscript)
1. Tarayıcınıza **Tampermonkey** veya **Violentmonkey** eklentisini kurun.
2. [instagram-unblock.user.js](./instagram-unblock.user.js) dosyasına tıklayın ve **Install** butonuna basın.

---

### Yöntem 3: Brave / Chrome Geliştirici Eklentisi (Manifest V3)
1. Bu depoyu ZIP olarak indirin ve klasöre çıkartın.
2. Brave'de \`chrome://extensions/\` adresine gidin.
3. Sağ üstteki **Geliştirici modu (Developer mode)** anahtarını açın.
4. **Paketlenmemiş öge yükle (Load unpacked)** butonuna basarak \`Brave-Extension\` klasörünü seçin.

---

## 📁 Proje Dosya Yapısı (Repository Structure)

\`\`\`text
.
├── filters.txt                # Brave Shields & uBlock Origin filtre kuralları
├── instagram-unblock.user.js  # Tampermonkey / Violentmonkey Kullanıcı Betiği
├── Brave-Extension/           # Manifest V3 Tarayıcı Eklentisi Kaynak Kodları
│   ├── manifest.json
│   ├── content.js
│   ├── styles.css
│   ├── popup.html
│   └── README.md
├── LICENSE                    # MIT Lisansı
└── README.md                  # Kurulum kılavuzu
\`\`\`

---

## 📜 Lisans
Bu proje [MIT Lisansı](./LICENSE) kapsamındadır. Serbestçe dağıtılabilir ve özelleştirilebilir.
`;
