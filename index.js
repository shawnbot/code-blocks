const fs = require('fs')
const fse = require('fs-extra')
const remark = require('remark')
const parents = require('unist-util-parents')
const select = require('unist-util-select')
const parsePairs = require('parse-pairs').default

const getPreviousNodeValue = require('./lib/getPreviousNodeValue')
const getDefaultTitle = require('./lib/getDefaultTitle')

const fromAST = (ast, opts, file) => {
  ast = parents(ast)
  return select(ast, 'code[lang]').map((node, index) => {
    transformNode(node, index, file)

    return node
  })
}

const transformNode = (node, index, file) => {
  var lang = node.lang
  var info = {}
  if (lang.indexOf(' ') > -1) {
    node.lang = lang.split(' ').shift()
    // grab everything after the lang and the trailing space
    var pairs = lang.substr(node.lang.length + 1)
    info = parsePairs(pairs)
  }
  node.info = info
  node.title = info.title
    || getPreviousNodeValue(node, 'heading')
    || getDefaultTitle(node, index, file)
}

const fromString = (string, opts, file) => {
  var ast = remark.parse(string)
  return fromAST(ast, opts, file)
}

const fromFile = (file, opts) => {
  return fse.readFile(file, "utf8")
    .then(str => fromString(str, opts, file))
}

const fromFileSync = (file, opts) => {
  const str = fs.readFileSync(file, "utf8")
  return fromString(str, file)
}

module.exports = {
  fromAST,
  fromString,
  fromFile,
  fromFileSync,
}
