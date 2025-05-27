// C:\Users\kwsty\lonely-limit\scripts\rss-to-json.ts
//
// 2025-05-14 改訂: import.meta / __dirname を排除し、process.cwd() から相対解決

import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

interface Story {
  id: string;
  source: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  published: string;
  hidden?: boolean;
}

// RSS フィード定義
const feeds: { source: string; url: string }[] = [
  { source: 'zenn', url: 'https://zenn.dev/mijucation/feed?all=1' },
  { source: 'note', url: 'https://note.com/ky1103/rss' },
];

/** クエリ・ハッシュを切り落とし origin+pathname で正規化 */
function linkKey(raw: string): string {
  try {
    const clean = raw.split(/[?#]/)[0].trim();
    const u = new URL(clean);
    return u.origin + u.pathname.replace(/\/$/, '');
  } catch {
    return raw.trim();
  }
}

/** source + linkKey で一意 ID を生成 */
function makeId(source: string, link: string): string {
  return `${source}-${linkKey(link)}`;
}

async function main() {
  const parser = new Parser();
  // プロジェクトルートからの相対パス解決
  const dataPath = path.resolve(process.cwd(), 'src/data/stories.json');

  // ① 古い stories.json を読み込み
  let oldStories: Story[] = [];
  if (fs.existsSync(dataPath)) {
    oldStories = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Story[];
  }
  const oldByKey = new Map<string, Story>(
    oldStories.map((s) => [linkKey(s.url), s])
  );

  // ② RSS 取得 & マージ
  const merged: Story[] = [];
  for (const feedDef of feeds) {
    const feed = await parser.parseURL(feedDef.url);
    for (const item of feed.items ?? []) {
      if (!item.link || !item.pubDate) continue;

      const link = item.link as string;
      const key = linkKey(link);
      const old = oldByKey.get(key);
      if (!old) {
        console.warn(`[rss-to-json] no old data for key=${key}`);
      }

      const rssTags = (item.categories || []) as string[];
      merged.push({
        id: old?.id ?? makeId(feedDef.source, link),
        source: feedDef.source,
        title: item.title || old?.title || '',
        summary:
          (item.contentSnippet || '').slice(0, 140) || old?.summary || '',
        url: link,
        tags: old?.tags ?? rssTags,
        published: new Date(item.pubDate).toISOString().slice(0, 10),
        hidden: old?.hidden === true,
      });
    }
  }

  // ③ 重複排除（linkKey） & 最新順ソート
  const unique = Array.from(
    new Map(merged.map((s) => [linkKey(s.url), s])).values()
  ).sort((a, b) => (a.published < b.published ? 1 : -1));

  // ④ JSON 出力
  fs.writeFileSync(dataPath, JSON.stringify(unique, null, 2) + '\n');
  console.log(`✅ stories.json updated: ${unique.length} items`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
