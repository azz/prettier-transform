"use strict";

describe("cli", () => {
  test("applies a transform to a file", () => {
    const result = run([
      "-t=./test/transform-foo-to-bar",
      "--parser=babylon",
      "./test/foo.js"
    ]);
    expectPass(result);
    expect(result.output.toString()).toMatchSnapshot();
  });

  test("passes unknown options to prettier", () => {
    const result = run([
      "-t=./test/transform-foo-to-bar",
      "--parser=babylon",
      "./test/foo.js",
      "--no-semi"
    ]);
    expectPass(result);
    expect(result.output.toString()).toMatchSnapshot();
  });
});

const spawnSync = require("child_process").spawnSync;

function run(args) {
  return spawnSync("node", ["./bin/prettier-transform.js"].concat(args));
}

function expectPass(result) {
  expect(result.error).toBeFalsy();
  expect(result.stderr.toString()).toEqual("");
}
