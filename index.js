const fs = require('fs')
const fse = require('fs-extra')
const remark = require('remark')
const parents = require('unist-util-parents')
const select = require('unist-util-select')
const parsePairs = require('parse-pairs').default
const getPreviousNodeValue = require('./lib/getPreviousNodeValue')

const fromAST = (ast, opts) => {
  // assign node.parent references if they haven't been set
  if (!ast.children[0].parent) {
    ast = parents(ast)
  }
  return select(ast, 'code[lang]').map(node => {
    transformNode(node)
    return node
  })
}

const transformNode = node => {
  var lang = node.lang
  var meta = {}
  if (lang.indexOf(' ') > -1) {
    node.lang = lang.split(' ').shift()
    // grab everything after the lang and the trailing space
    var pairs = lang.substr(node.lang.length + 1)
    meta = parsePairs(pairs)
  }
  node.meta = meta
  node.title = meta.title || getPreviousNodeValue(node, 'heading')
}

const fromString = (string, opts) => {
  var ast = remark.parse(string)
  return fromAST(ast, opts)
}

const fromFile = (filename, opts) => {
  return fse.readFile(filename, "utf8")
    .then(str => fromString(str, opts))
}

const fromFileSync = (filename, opts) => {
  const str = fs.readFileSync(filename, "utf8")
  return fromString(str)
}

module.exports = {
  fromAST,
  fromString,
  fromFile,
  fromFileSync,
}
