"use strict";

const traverse = require("babel-traverse").default;

module.exports = ast => {
  traverse(ast, {
    Identifier(path) {
      if (path.node.name === "foo") {
        path.node.name = "bar";
      }
    }
  });
  return ast;
};
