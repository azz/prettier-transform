"use strict";

const prettier = require("prettier");
const assert = require("assert");

function format(text, transforms, prettierOptions) {
  assert.ok(typeof text === "string", "text must be a string");
  assert.ok(
    Array.isArray(transforms) &&
      transforms.every(fn => typeof fn === "function"),
    "transforms must be an array of functions"
  );
  assert.ok(
    typeof prettierOptions === "object" && prettierOptions.parser,
    "prettierOptions.parser must be a provided"
  );

  return prettier.format(
    text,
    Object.assign({}, prettierOptions, {
      parser: makeParseWithTransforms(prettierOptions.parser, transforms)
    })
  );
}

function makeParseWithTransforms(parser, transforms) {
  return (text, parsers) => {
    const parse = parsers[parser];
    assert.ok(typeof parse === "function", `unknown parser ${parser}`);

    return transforms.reduce((ast, transform) => transform(ast), parse(text));
  };
}

module.exports = { format };
