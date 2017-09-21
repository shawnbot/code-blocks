const fs = require('fs')
const fromString = require('./fromString')

module.exports = (file, opts) => {
  const str = fs.readFileSync(file, "utf8")
  return fromString(str, opts, file)
}
