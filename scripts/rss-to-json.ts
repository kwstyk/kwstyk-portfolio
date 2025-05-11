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
  hidden?: boolean;      // 非表示フラグ
}

// RSS フィード定義
const feeds: { source: string; url: string }[] = [
  { source: 'zenn', url: 'https://zenn.dev/mijucation/feed?all=1' },
  { source: 'note', url: 'https://note.com/mijucation/rss' },
];

async function main() {
  const parser = new Parser();
  const newStories: Story[] = [];

  // ① 既存 stories.json を読み込み、hidden と tags をマップ化
  const dataPath = path.resolve(__dirname, '../src/data/stories.json');
  let oldStories: Story[] = [];
  if (fs.existsSync(dataPath)) {
    oldStories = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Story[];
  }
  // hidden フラグマップ
  const hiddenMap = new Map<string, boolean>(
    oldStories.filter(s => s.hidden === true).map(s => [s.id, true])
  );
  // カスタムタグマップ
  const tagMap = new Map<string, string[]>(
    oldStories.map(s => [s.id, s.tags])
  );

  // ② RSS 取得＆マッピング
  for (const feedDef of feeds) {
    const feed = await parser.parseURL(feedDef.url);
    const items = (feed.items ?? []) as any[];
    items.forEach((item: any) => {
      if (!item.link || !item.pubDate) return;
      const id = `${feedDef.source}-${item.guid || item.link}`;

      // RSS 由来のタグ
      const rssTags = (item.categories || []) as string[];

      newStories.push({
        id,
        source: feedDef.source,
        title: item.title || '',
        summary: (item.contentSnippet || '').slice(0, 140),
        url: item.link,
        // ③ 既存の手動タグがあればそちらを優先、それ以外は RSS タグを使用
        tags: tagMap.get(id) ?? rssTags,
        published: new Date(item.pubDate).toISOString().slice(0, 10),
        hidden: hiddenMap.get(id) === true,
      });
    });
  }

  // ④ 結果を書き出し
  fs.writeFileSync(dataPath, JSON.stringify(newStories, null, 2) + '\n');
  console.log(`✅ stories.json を更新しました（件数: ${newStories.length} 件）`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
