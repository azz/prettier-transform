"use strict";

const assert = require("assert");

function makeParseWithTransforms(parser, transforms) {
  assert.ok(typeof parser === "string", "parser must be a provided");
  assert.ok(
    Array.isArray(transforms) &&
      transforms.every(fn => typeof fn === "function"),
    "transforms must be an array of functions"
  );

  return (text, parsers) => {
    const parse = parsers[parser];
    assert.ok(typeof parse === "function", `unknown parser ${parser}`);

    return transforms.reduce((ast, transform) => transform(ast), parse(text));
  };
}

module.exports = makeParseWithTransforms;
