const remark = require('remark')
const fromAST = require('./fromAST')

module.exports = (string, opts, file) => {
  var ast = remark.parse(string)
  return fromAST(ast, opts, file)
}
