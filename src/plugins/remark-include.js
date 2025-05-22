// plugins/remark-include.js
import fs from 'node:fs/promises';
import path from 'node:path';
import { visit } from 'unist-util-visit';

export default function remarkInclude() {
  return async function transformer(tree, file) {
    const dir = path.dirname(file.path);
    const includes = [];

    visit(tree, 'leafDirective', (node) => {
      if (node.name === 'include' && node.attributes?.src) {
        includes.push({ node, src: node.attributes.src });
      }
    });

    for (const { node, src } of includes) {
      const fullPath = path.resolve(dir, src);
      try {
        const included = await fs.readFile(fullPath, 'utf-8');
        node.type = 'html';
        node.value = included;
        delete node.children;
        delete node.name;
        delete node.attributes;
      } catch {
        node.type = 'paragraph';
        node.children = [{ type: 'text', value: `<!-- Include failed: ${src} -->` }];
      }
    }
  };
}
