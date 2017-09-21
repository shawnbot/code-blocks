const fse = require('fs-extra')
const fromString = require('./fromString')

module.exports = (file, opts) => {
  return fse.readFile(file, 'utf8').then(str => fromString(str, opts, file))
}
