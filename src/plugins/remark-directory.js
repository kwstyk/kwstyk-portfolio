// ```text (ツリー構造)``` → <DirectoryTree>…</DirectoryTree>
import { visit } from 'unist-util-visit';

export default function remarkDirectory() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'text' && node.value.includes('packet-capture/')) {
        node.type  = 'html';
        node.value = `<DirectoryTree>${node.value}</DirectoryTree>`;
      }
    });
  };
}
