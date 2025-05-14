// C:\Users\kwsty\lonely-limit\scripts\rss-to-json.ts
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

/** URL を正規化して一意 ID を生成 */
function normalizeId(source: string, link: string): string {
  const clean = link.trim().replace(/\/$/, ''); // 末尾 /
  return `${source}-${clean}`;
}

async function main() {
  const parser = new Parser();
  const dataPath = path.resolve(__dirname, '../src/data/stories.json');

  /* ① 既存 stories.json 読込 */
  let oldStories: Story[] = [];
  if (fs.existsSync(dataPath)) {
    oldStories = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Story[];
  }

  const hiddenMap = new Map<string, boolean>(
    oldStories
      .filter(s => s.hidden === true)
      .map(s => [normalizeId(s.source, s.url), true]),
  );
  const tagMap = new Map<string, string[]>(
    oldStories.map(s => [normalizeId(s.source, s.url), s.tags]),
  );

  /* ② RSS 取得 & マッピング */
  const newStories: Story[] = [];

  for (const feedDef of feeds) {
    const feed = await parser.parseURL(feedDef.url);
    const items = (feed.items ?? []) as any[];

    items.forEach((item: any) => {
      if (!item.link || !item.pubDate) return;

      const link = item.link as string;
      const id = normalizeId(feedDef.source, item.guid || link);

      const rssTags = (item.categories || []) as string[];

      newStories.push({
        id,
        source: feedDef.source,
        title: item.title || '',
        summary: (item.contentSnippet || '').slice(0, 140),
        url: link,
        tags: tagMap.get(id) ?? rssTags,          // 手動タグを優先
        published: new Date(item.pubDate).toISOString().slice(0, 10),
        hidden: hiddenMap.get(id) === true,
      });
    });
  }

  /* ③ 重複排除 & 最新順ソート（任意だが推奨） */
  const unique = Array.from(
    new Map(newStories.map(s => [s.id, s])).values(),
  ).sort((a, b) => (a.published < b.published ? 1 : -1));

  /* ④ JSON 書き出し */
  fs.writeFileSync(dataPath, JSON.stringify(unique, null, 2) + '\n');
  console.log(`✅ stories.json を更新しました（件数: ${unique.length} 件）`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
