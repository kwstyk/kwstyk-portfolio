// src/components/molecules/FilterBar.test.ts
import { describe, it, expect } from 'vitest';
import { render } from 'astro/server';
import { JSDOM } from 'jsdom';
import FilterBar from './FilterBar.astro';

describe('FilterBar SSR render', () => {
  it('初期レンダリングで network-security ボタンがある', async () => {
    const result = await render(FilterBar, {});
    const dom = new JSDOM(result.html);
    const btn = dom.window.document.querySelector('button.category-btn');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('aria-pressed')).toBe('false');
  });
});
