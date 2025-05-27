// plugins/rehype-copy-button.js
import { visit } from 'unist-util-visit'

export default function rehypeCopyButton() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        node.properties = node.properties || {};
        node.children.push({
          type: 'element',
          tagName: 'button',
          properties: {
            className: ['copy-button'],
            onclick: `
              navigator.clipboard.writeText(
                this.parentElement.querySelector('code').innerText
              ).then(() => {
                this.innerText = '✅ Copied!';
                setTimeout(() => this.innerText = '📋 Copy', 1500);
              });
            `
          },
          children: [{ type: 'text', value: '📋 Copy' }],
        });
      }
    });
  };
}
