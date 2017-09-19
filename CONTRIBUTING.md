# Contributing to `code-blocks`
Hi, and thanks for taking the time to contribute to this project!

## Rules
1. When developing, please run your code through [prettier](https://prettier.io/) before committing. You can prettify the entire codebase in place by running:

    ```sh
    npm run prettier
    ```
    
    This project's prettier configuration lives in [package.json](package.json) under the `prettier` key. **Please don't change it.**

1. Please run the tests locally and ensure that they pass:

    ```sh
    npm test
    ```

## Testing
If you're not familiar with [ava](https://github.com/avajs/ava), please [read the docs](https://github.com/avajs/ava#documentation) to understand how it differs from test frameworks like Mocha, Jasmine, etc. See [spec.js](test/spec.js) for unit test examples, and [meta.spec.md](https://github.com/shawnbot/code-blocks/blob/master/test/meta.spec.md#readme) for instructions on writing "meta-tests".

* For bug fixes, please add one or more failing tests to demonstrate the bug and its resolution.
* For new features, please add as many tests as necessary to ensure that it works the way you expect it to.
* Please call out breaking API changes explicitly in your pull request.

Thanks again, and don't hesitate to reach out by [filing an issue](https://github.com/shawnbot/code-blocks/issues/new). :beers:
