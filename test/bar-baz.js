"use strict";

const traverse = require("babel-traverse").default;

module.exports = ast => {
  traverse(ast, {
    Identifier(path) {
      if (path.node.name === "bar") {
        path.node.name = "baz";
      }
    }
  });
  return ast;
};
