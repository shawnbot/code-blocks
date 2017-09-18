# API

## `fromFile(filename[, options])`

Read a file asynchronously and parse all of the code blocks from it. Paths are
relative to the current working directory (`process.cwd()`) unless they're
specified absolutely. `fromFile()` returns a [Promise] that resolves to an
array of code block objects:

```js
const codeBlocks = require('code-blocks')
codeBlocks.fromFile('README.md')
  .then(blocks => {
    // do stuff with the blocks here
  })
```

## `fromFileSync(filename[, options])`

This is the synchronous version of [`fromFile()`]:

```js
const codeBlocks = require('code-blocks')
const blocks = codeBlocks.fromFileSync('README.md')
// do stuff with the blocks here
```

