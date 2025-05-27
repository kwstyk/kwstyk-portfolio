// ```bash …``` → <CopyBlock lang="bash">…</CopyBlock>
import { visit } from 'unist-util-visit';

export default function remarkCopyBlock() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang && node.lang !== 'text') {
        const lang = node.lang;
        const code = node.value;
        node.type  = 'html';
        node.value = `<CopyBlock lang="${lang}">${code}</CopyBlock>`;
      }
    });
  };
}
