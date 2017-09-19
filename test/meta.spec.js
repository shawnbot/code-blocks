const blocks = require('..')
const path = require('path')
const test = require('ava')
const vm = require('vm')

const tests = ['../README.md', '../api.md', 'meta.spec.md']
  .reduce((tests, file) => {
    return tests.concat(blocks.fromFileSync(path.join(__dirname, file)))
  }, [])
  .filter(
    block =>
      block.lang === 'js' &&
      block.info.skip !== 'true' &&
      block.value.indexOf('test') > -1
  )
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
        return result.then(msg => t.pass(msg)).catch(error => t.fail(error))
      } else {
        return t.pass(result)
      }
    })
  })
