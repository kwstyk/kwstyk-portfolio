// plugins/rehype-copy-button.js
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export default function rehypeCopyButton() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node.children.some((c) => c.tagName === 'code')) {
        const button = h('button', { class: 'copy-button', onclick: 'navigator.clipboard.writeText(this.previousElementSibling.textContent)' }, 'Copy');
        parent.children.splice(index + 1, 0, button);
      }
    });
  };
}
