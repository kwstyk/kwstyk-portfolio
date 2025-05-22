// plugins/remark-alert.js
import { visit } from 'unist-util-visit';

export default function remarkAlert() {
  return (tree) => {
    visit(tree, (node) => {
      // ブロック / leaf の両方を処理
      if (
        (node.type === 'containerDirective' || node.type === 'leafDirective')
        && node.name === 'alert'
      ) {
        const data = node.data || (node.data = {});
        const attrs = node.attributes || {};
        // 属性 type="warn" など
        const type = String(attrs.type || 'info');

        // HTML 出力を <div> with classes
        data.hName = 'div';
        data.hProperties = {
          className: `my-4 border-l-4 p-4 rounded alert-${type}`,
        };
      }
    });
  };
}
