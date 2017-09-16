const fse = require('fs-extra')
const path = require('path')
const remark = require('remark')
const test = require('ava')
const blocks = require('..')

const fixture = (...filename) => {
  return path.join(__dirname, 'fixtures', ...filename)
}

const readFixture = (...filename) => {
  return fse.readFile(fixture(...filename), "utf8")
}

test('it can read from an AST', t => {
  return readFixture('basic.md')
    .then(remark.parse)
    .then(ast => {
      const b = blocks.fromAST(ast)
      t.is(b.length, 1)
      t.is(b[0].lang, 'js')
      t.pass()
    })
})

test('it can read strings', t => {
  return readFixture('basic.md')
    .then(markdown => {
      const b = blocks.fromString(markdown)
      t.is(b.length, 1)
      t.is(b[0].lang, 'js')
      t.pass()
    })
})

test('it can read files', t => {
  return blocks.fromFile(fixture('basic.md'))
    .then(b => {
      t.is(b.length, 1)
      t.is(b[0].lang, 'js')
      t.pass()
    })
})

test('it can parse key/value pairs in fenced code blocks', t => {
  return blocks.fromFile(fixture('metadata.md'))
    .then(b => {
      t.is(b.length, 3)

      const js = b[0]
      t.is(js.lang, 'js')
      t.deepEqual(js.meta, {title: 'JavaScript'})
      t.deepEqual(js.title, 'JavaScript')

      const html = b[1]
      t.is(html.lang, 'html')
      t.deepEqual(html.meta, {title: 'This is HTML'})
      t.deepEqual(html.title, 'This is HTML')

      const ruby = b[2]
      t.is(ruby.lang, 'ruby')
      t.deepEqual(ruby.meta, {x: '1', y: '2', z: 'foo bar'})
    })
})

test('it infers titles from previous heading', t => {
  return blocks.fromFile(fixture('headings.md'))
    .then(b => {
      t.is(b.length, 4)
      t.is(b[0].title, 'Example 1')
      t.is(b[1].title, 'Example 2')
      t.is(b[2].title, 'Example 2 (2)')
      t.is(b[3].title, 'Example 3')
      t.pass()
    })
})
