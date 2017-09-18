# Meta-tests

This document is parsed by [meta.spec.js](meta.spec.js), and each
`js` block is run as a sandboxed test script with the following
context variables:

* `__dirname` is passed from `meta.spec.js` so that we can
  predict source paths.
* `block` is the parsed code block itself.
* `blocks` is the `code-blocks` import (i.e. `require('..')`)
* `test` is the [ava] test run instance, as in:

    ```js skip=true
    ava(block.title, test => {
      return eval(block.code, {test})
    })
    ```

    **Note** `eval()` is used to approximate what actually
    happens, which is that we create a [vm.Script] instance and
    run it with a [sandboxed context].

## Skipping blocks

Any code block with `skip=true` will be skipped, as in:

~~~markdown
```js skip=true
const ex = 'This is only an example.'
```
~~~

If the code returns a Promise, the resolved value will be passed
to `test.pass()`.

## And now, the tests...

### Node source

**Note** if this test fails, it's because the line number needs
to match that of the <code>```js</code>:

```js
test.is(block.source.line, 43)
test.is(block.source.file, __dirname + '/meta.spec.md')
```

### Basic test

```js
test.is(block.lang, 'js')
test.is(block.title, 'Basic test')
test.deepEqual(block.info, {})
```

### Info parsing

```js x=1 y=2 z="1 2 3" "a b c"="you and me"
test.is(block.lang, 'js')
test.is(block.title, 'Info parsing')
test.deepEqual(block.info, {
  x: "1",
  y: "2",
  z: "1 2 3",
  "a b c": "you and me",
})
test.pass()
```

[ava]: https://github.com/avajs/ava
[vm.Script]: https://nodejs.org/api/vm.html#vm_new_vm_script_code_options
[sandboxed context]: https://nodejs.org/api/vm.html#vm_vm_createcontext_sandbox
