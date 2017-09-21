const parents = require('unist-util-parents')
const select = require('unist-util-select')
const transformNode = require('./transformNode')

module.exports = (ast, opts, file) => {
  ast = parents(ast)
  return select(ast, 'code[lang]').map((node, index) => {
    transformNode(node, index, file)
    return node
  })
}
