"use strict";

const prettier = require("prettier");
const resolve = require("resolve");
const assert = require("assert");

const makeParseWithTransforms = require("./lib/parseWithTransforms");

function prettierTransform(code, parsers, options) {
  const transformConfig = getTransformsConfig(options);
  assert.ok(transformConfig, "transform configuration missing");
  assert.ok(
    typeof transformConfig.parser === "string",
    "transform.parser configuration missing"
  );
  assert.ok(
    Array.isArray(transformConfig.transforms),
    "transform.transforms must be an array"
  );

  return makeParseWithTransforms(
    transformConfig.parser,
    transformConfig.transforms.map(loadTransform)
  )(code, parsers);
}

function getTransformsConfig(options) {
  if (options.transform) {
    return options.transform;
  }
  if (options.filepath) {
    const config = prettier.resolveConfig.sync(options.filepath);
    if (config && config.transform) {
      return options.transform;
    }
  }
}

function loadTransform(modulePath) {
  const fsPath = resolve.sync(modulePath, { basedir: process.cwd() });
  return require(fsPath);
}

module.exports = prettierTransform;
module.exports.format = require("./lib/format");
