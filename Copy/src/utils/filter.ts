// src/utils/filter.ts
export interface CardData {
  category: string;
  difficulty: string;
  repro: string[];
  title: string;
}

export function filterCards(
  cards: CardData[],
  selCats: string[],
  selDiffs: string[],
  selRepros: string[],
  keyword: string
): CardData[] {
  const kw = keyword.trim().toLowerCase();
  return cards.filter(card => {
    const okCat  = !selCats.length  || selCats.includes(card.category);
    const okDiff = !selDiffs.length || selDiffs.includes(card.difficulty);
    const okRepro= !selRepros.length|| selRepros.some(r => card.repro.includes(r));
    const okKw   = !kw || card.title.toLowerCase().includes(kw);
    return okCat && okDiff && okRepro && okKw;
  });
}
