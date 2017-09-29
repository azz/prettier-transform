"use strict";

const prettier = require("prettier");
const assert = require("assert");

const makeParseWithTransforms = require("./parseWithTransforms");

function format(text, transforms, prettierOptions) {
  assert.ok(typeof text === "string", "text must be a string");
  assert.ok(
    prettierOptions && typeof prettierOptions === "object",
    "prettierOptions must be an object"
  );

  return prettier.format(
    text,
    Object.assign({}, prettierOptions, {
      parser: makeParseWithTransforms(prettierOptions.parser, transforms)
    })
  );
}

module.exports = format;
