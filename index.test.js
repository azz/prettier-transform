"use strict";

const prettier = require("prettier");
const prettierTransform = require("./");

describe("prettier-transform", () => {
  test("returns an AST", () => {
    const result = prettierTransform(
      "foo()",
      { john: () => ({ ast: true }) },
      {
        filepath: "test.ext",
        transform: { parser: "john", transforms: [] }
      }
    );
    expect(result).toEqual({ ast: true });
  });

  test("prettier.format calls through to transformation", () => {
    const result = prettier.format("foo()", {
      parser: prettierTransform,
      filepath: "test.js",
      transform: {
        parser: "babylon",
        transforms: ["./test/foo-bar"]
      }
    });
    expect(result).toEqual("bar();\n");
  });

  test("prettier.format works with multiple transforms", () => {
    const result = prettier.format("foo()", {
      parser: prettierTransform,
      filepath: "test.js",
      transform: {
        parser: "babylon",
        transforms: ["./test/foo-bar", "./test/bar-baz"]
      }
    });
    expect(result).toEqual("baz();\n");
  });
});
