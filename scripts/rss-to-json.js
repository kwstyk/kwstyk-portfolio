// scripts/rss-to-json.js (ESMモード)
import fs from 'fs';
import Parser from 'rss-parser';

async function main() {
  const feeds = [
    { source: 'zenn', url: 'https://zenn.dev/mijucation/feed?all=1' },
    { source: 'note', url: 'https://note.com/ky1103/rss' },
  ];
  const parser = new Parser();
  const all = [];

  for (const feedDef of feeds) {
    const feed = await parser.parseURL(feedDef.url);
    const items = feed.items || [];
    for (const item of items) {
      if (!item.link || !item.pubDate) continue;
      all.push({
        id: `${feedDef.source}-${item.guid || item.link}`,
        source: feedDef.source,
        title: item.title || '',
        summary: (item.contentSnippet || '').slice(0, 140),
        url: item.link,
        tags: item.categories || [],
        published: new Date(item.pubDate).toISOString().slice(0,10),
      });
    }
  }

  fs.writeFileSync('src/data/stories.json', JSON.stringify(all, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

