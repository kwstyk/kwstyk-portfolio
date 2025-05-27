// src/utils/filter.test.ts
import { filterCards } from './filter';
import type { CardData } from './filter';
import { describe, it, expect } from 'vitest';


const cards: CardData[] = [
  { category: 'network-security', difficulty: 'easy', repro: ['docker'], title: 'Packet Capture' },
  { category: 'devops',           difficulty: 'hard', repro: ['terraform'], title: 'Infra as Code' },
];

describe('filterCards', () => {
  it('カテゴリフィルタが動作する', () => {
    expect(filterCards(cards, ['network-security'], [], [], '')).toHaveLength(1);
  });

  it('難易度フィルタが動作する', () => {
    expect(filterCards(cards, [], ['hard'], [], '')).toHaveLength(1);
  });

  it('再現方法フィルタが動作する', () => {
    expect(filterCards(cards, [], [], ['docker'], '')).toHaveLength(1);
  });

  it('キーワードフィルタが動作する', () => {
    expect(filterCards(cards, [], [], [], 'Infra')).toHaveLength(1);
  });

  it('複数フィルタを AND 条件で適用できる', () => {
    expect(filterCards(cards, ['network-security'], ['easy'], ['docker'], 'Packet')).toHaveLength(1);
    expect(filterCards(cards, ['network-security'], ['easy'], ['terraform'], '')).toHaveLength(0);
  });
});
