"use strict";

const format = require("./format");

const replaceFooWithBar = require("../test/foo-bar");
const replaceBarWithBaz = require("../test/bar-baz");

describe("format()", () => {
  test("throws an error if code is not a string", () => {
    expect(() => {
      format(null, [], { parser: "babylon" });
    }).toThrowErrorMatchingSnapshot();
  });

  test("throws an error if transforms is not an array of functions", () => {
    expect(() => {
      format("foo()", null, { parser: "babylon" });
    }).toThrowErrorMatchingSnapshot();
  });

  test("throws an error if no parser option is present", () => {
    expect(() => {
      format("foo()", [], null);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      format("foo()", [], {});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      format("foo()", [], { parser: null });
    }).toThrowErrorMatchingSnapshot();
  });

  it("outputs code formatted by prettier", () => {
    const output = format("foo()", [], { parser: "babylon" });
    expect(output).toEqual("foo();\n");
  });

  it("applies multiple transforms in order", () => {
    const output = format("foo()", [replaceFooWithBar, replaceBarWithBaz], {
      parser: "babylon"
    });
    expect(output).toEqual("baz();\n");
  });

  it("forwards options to prettier", () => {
    const output = format("foo()", [], {
      parser: "babylon",
      semi: false
    });
    expect(output).toEqual("foo()\n");
  });
});
