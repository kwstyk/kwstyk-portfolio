// scripts/rss-to-json.ts
import fs from 'fs';
import Parser from 'rss-parser';

interface Story {
  id: string;
  source: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  published: string;
}

const feeds: { source: string; url: string }[] = [
  { source: 'zenn', url: 'https://zenn.dev/mijucation/feed?all=1' },
  { source: 'note', url: 'https://note.com/mijucation/rss' },
];

async function main() {
  const parser = new Parser();
  const all: Story[] = [];

  for (const feedDef of feeds) {
    const feed = await parser.parseURL(feedDef.url);
    // feed.items を配列として扱い、forEach でループ
    const items = (feed.items ?? []) as any[];
    items.forEach((item: any) => {
      if (!item.link || !item.pubDate) return;
      all.push({
        id: `${feedDef.source}-${item.guid || item.link}`,
        source: feedDef.source,
        title: item.title || '',
        summary: (item.contentSnippet || '').slice(0, 140),
        url: item.link,
        tags: item.categories || [],
        published: new Date(item.pubDate).toISOString().slice(0,10),
      });
    });
  }

  fs.writeFileSync('src/data/stories.json', JSON.stringify(all, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
