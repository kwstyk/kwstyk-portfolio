// src/utils/seo.ts
export interface SeoProps {
    title: string;         // ページタイトル
    description: string;   // meta description
    pathname?: string;     // ウェブパス (e.g. "/structure")
    imagePath?: string;    // OGP画像パス (相対URL)
  }
  
  export function generateMeta({
    title,
    description,
    pathname = "",
    imagePath = "/og/default.png",
  }: SeoProps) {
    const siteUrl = "https://kwstyk-portfolio.vercel.app";  // 本番URLに合わせて
    const url = `${siteUrl}${pathname}`;
  
    return {
      title,
      description,
      url,
      image: `${siteUrl}${imagePath}`,
    };
  }
  