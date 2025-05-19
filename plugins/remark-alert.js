// plugins/remark-alert.js
import { visit } from 'unist-util-visit'

export default function remarkAlert() {
  console.log('⚙️ remark-alert plugin loaded')  

  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      console.log(`🔍 found containerDirective: ${node.name}`)
      
      const type = node.name || 'info'
      if (!['info', 'warn', 'error'].includes(type)) return

      const data = node.data || (node.data = {})
      // HAST に変換するタグ名とクラスを指定
      data.hName = 'div'
      data.hProperties = {
        className: ['alert', `alert-${type}`],
      }
    })
  }
}
