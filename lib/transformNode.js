const getPreviousNodeValue = require('./getPreviousNodeValue')
const getDefaultTitle = require('./getDefaultTitle')
const parsePairs = require('parse-pairs').default

module.exports = (node, index, file) => {
  var lang = node.lang || ''
  var info = {}
  if (lang.indexOf(' ') > -1) {
    node.lang = lang.split(' ').shift()
    // grab everything after the lang and the trailing space
    var pairs = lang.substr(node.lang.length + 1)
    info = parsePairs(pairs)
  }
  node.info = info
  node.source = {
    file: file || 'buffer',
    line: node.position.start.line,
  }
  node.title = info.title
    || getPreviousNodeValue(node, 'heading')
    || getDefaultTitle(node, index, file)
}
