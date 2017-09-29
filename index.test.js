"use strict";

const traverse = require("babel-traverse").default;
const prettierTransform = require("./");

describe("format()", () => {
  test("throws an error if code is not a string", () => {
    expect(() => {
      prettierTransform.format(null, [], { parser: "babylon" });
    }).toThrowErrorMatchingSnapshot();
  });

  test("throws an error if transforms is not an array of functions", () => {
    expect(() => {
      prettierTransform.format("foo()", null, { parser: "babylon" });
    }).toThrowErrorMatchingSnapshot();
  });

  test("throws an error if no parser option is present", () => {
    expect(() => {
      prettierTransform.format("foo()", [], null);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      prettierTransform.format("foo()", [], {});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      prettierTransform.format("foo()", [], { parser: null });
    }).toThrowErrorMatchingSnapshot();
  });

  it("outputs code formatted by prettier", () => {
    const output = prettierTransform.format("foo()", [], { parser: "babylon" });
    expect(output).toEqual("foo();\n");
  });

  const replaceFooWithBar = ast => {
    traverse(ast, {
      Identifier(path) {
        if (path.node.name === "foo") {
          path.node.name = "bar";
        }
      }
    });
    return ast;
  };

  const replaceBarWithBaz = ast => {
    traverse(ast, {
      Identifier(path) {
        if (path.node.name === "bar") {
          path.node.name = "baz";
        }
      }
    });
    return ast;
  };

  it("applies a single transform", () => {
    const output = prettierTransform.format("foo()", [replaceFooWithBar], {
      parser: "babylon"
    });
    expect(output).toEqual("bar();\n");
  });

  it("applies multiple transforms in order", () => {
    const output = prettierTransform.format(
      "foo()",
      [replaceFooWithBar, replaceBarWithBaz],
      { parser: "babylon" }
    );
    expect(output).toEqual("baz();\n");
  });

  it("forwards options to prettier", () => {
    const output = prettierTransform.format("foo()", [], {
      parser: "babylon",
      semi: false
    });
    expect(output).toEqual("foo()\n");
  });
});
