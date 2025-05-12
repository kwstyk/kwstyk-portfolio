// src/utils/seo.ts
export interface SeoProps {
    title?: string;         // ページタイトル
    description?: string;   // meta description
    pathname?: string;     // ウェブパス (e.g. "/structure")
    imagePath?: string;    // OGP画像パス (相対URL)
  }
  
// サイト全体で共通して使用するデフォルト値
const SITE_TITLE = 'KWSTYK Portfolio';
const SITE_DESCRIPTION = '成長と実績を証明するポートフォリオ';
const SITE_URL = 'https://kwstyk-portfolio.vercel.app';
const DEFAULT_IMAGE_PATH = '/og/default.png';

/**
 * SEO メタ情報を生成する
 * - ページタイトルがあれば "{title} | {SITE_TITLE}" の形式に補完
 * - description が未指定ならデフォルトを使用
 * - pathname, imagePath はフル URL に補完
 */
export function generateSeo({
  title,
  description,
  pathname = '',
  imagePath = DEFAULT_IMAGE_PATH,
}: SeoProps) {
  // フルタイトルを作成 (ページタイトル + サイト名)
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  // description がなければデフォルト
  const metaDescription = description ?? SITE_DESCRIPTION;
  // 絶対 URL を組み立て
  const url = `${SITE_URL}${pathname}`;
  // 絶対パスの OGP 画像 URL
  const image = `${SITE_URL}${imagePath}`;

  return {
    title: fullTitle,
    description: metaDescription,
    url,
    image,
  };
}
  