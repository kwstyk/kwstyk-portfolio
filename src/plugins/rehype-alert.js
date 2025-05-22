import { visit } from 'unist-util-visit'

/**
 * rehype plugin to transform :::info, :::warn, :::error into styled <div class="alert alert-info"> blocks
 */
export default function rehypeAlert() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      const type = node.name || 'info'

      if (!['info', 'warn', 'error'].includes(type)) return

      const data = node.data || (node.data = {})
      const tagName = 'div'

      data.hName = tagName
      data.hProperties = {
        className: ['alert', `alert-${type}`],
      }
    })
  }
}
