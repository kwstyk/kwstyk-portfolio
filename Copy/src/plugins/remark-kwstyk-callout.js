// plugins/remark-kwstyk-callout.js
import { visit } from 'unist-util-visit';

export default function remarkKwstykCallout() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && ['info', 'warn', 'error'].includes(node.name)) {
        const type = node.name;
        node.data = {
          hName: 'div',
          hProperties: {
            className: [`alert`, `alert-${type}`],
          },
        };
      }
    });
  };
}
