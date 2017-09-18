const blocks = require('..')
const path = require('path')
const test = require('ava')
const vm = require('vm')

blocks.fromFileSync(path.join(__dirname, 'meta.spec.md'))
  .filter(block => (
    block.lang === 'js' && !block.info.skip
  ))
  .map(block => {
    test(block.title, t => {
      const script = new vm.Script(block.value, {
        filename: block.source.file,
        lineOffset: block.source.line,
        displayErrors: true,
      })
      const context = vm.createContext({
        __dirname,
        block,
        blocks,
        test: t,
      })
      const result = script.runInContext(context)
      if (result instanceof Promise) {
        return result
          .then(msg => t.pass(msg))
          .catch(error => t.fail(error))
      } else {
        return t.pass(result)
      }
    })
  })
