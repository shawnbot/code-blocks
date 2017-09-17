const path = require('path')

module.exports = (node, index, file) => {
  const filename = file ? path.basename(file) : 'buffer'
  const start = node.position.start
  return `Code block ${index + 1} from ${filename}:${start.line}`
}
