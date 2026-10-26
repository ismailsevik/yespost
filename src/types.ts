export type AppTab = 'filters' | 'userscript' | 'extension' | 'github' | 'simulator' | 'proxy' | 'installation';

export interface FilterRuleItem {
  id: string;
  category: 'modal' | 'backdrop' | 'style' | 'network' | 'footer';
  rule: string;
  descriptionTr: string;
  descriptionEn: string;
  isCustom?: boolean;
}

export interface ExtensionFile {
  filename: string;
  content: string;
  language: 'json' | 'javascript' | 'css' | 'markdown';
  description: string;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  likes: string;
  comments: string;
  caption: string;
  type: 'image' | 'video' | 'carousel';
  timeAgo: string;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  avatarUrl: string;
  isVerified: boolean;
  postsCount: string;
  followersCount: string;
  followingCount: string;
  posts: InstagramPost[];
}

export interface GeminiOptimizationResult {
  adblockRules: string[];
  userscriptSnippet: string;
  explanationTr: string;
  explanationEn: string;
}
