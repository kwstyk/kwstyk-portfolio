// C:\Users\kwsty\lonely-limit\scripts\rss-to-json.ts
//
// 2025-05-14: hidden / 手動タグが消える問題を再修正
//  - URL を正規化し、`origin + pathname` をキーにマージ
//  - 旧 ID が存在すれば再利用して履歴を保つ

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

/** URL → host + pathname（末尾 / 除去）に正規化 */
function linkKey(raw: string): string {
  try {
    const u = new URL(raw.trim());
    const path = u.pathname.replace(/\/$/, '');
    return `${u.host}${path}`; // 例: zenn.dev/mijucation/articles/abc
  } catch {
    return raw.trim();
  }
}

/** デフォルト ID 生成（source-<linkKey>） */
function makeId(source: string, link: string): string {
  return `${source}-${linkKey(link)}`;
}

async function main() {
  const parser = new Parser();
  const dataPath = path.resolve(__dirname, '../src/data/stories.json');

  /* ① 旧 stories.json を読み込み、リンクキーでマップ化 */
  let oldStories: Story[] = [];
  if (fs.existsSync(dataPath)) {
    oldStories = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Story[];
  }

  const oldByKey = new Map<string, Story>(
    oldStories.map((s) => [linkKey(s.url), s]),
  );

  /* ② RSS 取得 & マージ */
  const merged: Story[] = [];

  for (const feedDef of feeds) {
    const feed = await parser.parseURL(feedDef.url);
    const items = (feed.items ?? []) as any[];

    items.forEach((item: any) => {
      if (!item.link || !item.pubDate) return;

      const link = item.link as string;
      const key = linkKey(link);
      const rssTags = (item.categories || []) as string[];

      // 旧データがあれば再利用、無ければ新規
      const old = oldByKey.get(key);

      merged.push({
        id: old?.id ?? makeId(feedDef.source, link), // 旧 ID を優先
        source: feedDef.source,
        title: item.title || old?.title || '',
        summary:
          (item.contentSnippet || '').slice(0, 140) || old?.summary || '',
        url: link,
        tags: old?.tags ?? rssTags,
        published: new Date(item.pubDate).toISOString().slice(0, 10),
        hidden: old?.hidden === true,
      });
    });
  }

  /* ③ 重複排除（linkKey）& 最新順ソート */
  const unique = Array.from(
    new Map(merged.map((s) => [linkKey(s.url), s])).values(),
  ).sort((a, b) => (a.published < b.published ? 1 : -1));

  /* ④ JSON 書き出し */
  fs.writeFileSync(dataPath, JSON.stringify(unique, null, 2) + '\n');
  console.log(`✅ stories.json を更新しました（件数: ${unique.length} 件）`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
