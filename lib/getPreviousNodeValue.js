const findBefore = require('unist-util-find-before')

module.exports = (node, selector) => {
  if (node.parent) {
    var previous = findBefore(node.parent, node, selector)
    if (previous) {
      // poor person's stringify
      var value = previous.children
        .map(c => c.value)
        .filter(value => value)
        .join('')
      if (typeof previous.uses === 'number') {
        value += ' (' + ++previous.uses + ')'
      } else {
        previous.uses = 1
      }
      return value
    }
  }
  return undefined
}
