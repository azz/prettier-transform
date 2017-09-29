#!/usr/bin/env node

"use strict";

const camelcaseKeys = require("camelcase-keys");
const minimist = require("minimist");
const resolve = require("resolve");
const assert = require("assert");
const globby = require("globby");
const path = require("path");
const fs = require("fs");

const prettierTransform = require("../");

const args = normalizeArgs(parseArgv(process.argv.slice(2)));

assert.ok(typeof args.parser === "string", "--parser must be a string");

const transforms = args.transform.map(loadTransform);
const filePaths = getFilePaths(args.patterns);

delete args.prettierOptions.t;
delete args.prettierOptions._;

for (const code of filePaths.map(readFile)) {
  const output = prettierTransform.format(
    code,
    transforms,
    Object.assign({}, args.prettierOptions, {
      parser: args.parser
    })
  );
  console.log(output); // eslint-disable-line no-console
}

function parseArgv(argv) {
  return minimist(argv, {
    string: ["t", "parser"],
    default: {
      t: []
    }
  });
}

function normalizeArgs(args) {
  return Object.assign({}, args, {
    transform: [].concat(args.t || []),
    patterns: [].concat(args._ || []),
    prettierOptions: camelcaseKeys(args)
  });
}

function getFilePaths(patterns) {
  return globby
    .sync(patterns, { dot: true })
    .map(
      filePath =>
        path.isAbsolute(filePath)
          ? path.relative(process.cwd(), filePath)
          : filePath
    );
}

function loadTransform(modulePath) {
  const fsPath = resolve.sync(modulePath, { basedir: process.cwd() });
  return require(fsPath);
}

function readFile(filePath) {
  return fs.readFileSync(
    path.isAbsolute(filePath)
      ? filePath
      : path.relative(process.cwd(), filePath),
    "utf8"
  );
}
