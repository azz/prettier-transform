# prettier-transform
[![Travis](https://img.shields.io/travis/azz/prettier-transform.svg?style=flat-square)](https://travis-ci.org/azz/prettier-transform)
[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/prettier-transform.svg?style=flat-square)](https://npmjs.org/prettier-transform)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

## Install

```bash
yarn add --dev prettier-transform
```

## CLI Usage

Basic usage:

```bash
prettier-transform file.js --parser babylon -t ./my-transform
```

Unknown options will be passed to prettier:

```bash
prettier-transform file.js --parser babylon -t ./my-transform --no-semi
```

## API Usage

Basic usage:

```js
const prettierTransform = require("prettier-transform");
const myTransform = require("./my-transform");

prettierTransform("foo()", [myTransform], { parser: "babylon" });
```

Pass options to prettier:

```js
prettierTransform("foo()", [myTransform], {
  parser: "babylon",
  semi: false
});
```
