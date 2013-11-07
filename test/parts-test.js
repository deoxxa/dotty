var dotty = require("../lib/index"),
    vows = require("vows"),
    assert = require("assert");

vows.describe("parts").addBatch({
  "A simple path": {
    "as a string": {
      topic: dotty.parts("a"),
      "should return the correct value": function(res) {
        assert.deepEqual(res, ["a"]);
      },
    },
    "as an array": {
      topic: dotty.parts(["a"]),
      "should return the correct value": function(res) {
        assert.deepEqual(res, ["a"]);
      },
    },
  },
  "A two-level path": {
    "as a string": {
      topic: dotty.parts("a.b"),
      "should return the correct value": function(res) {
        assert.deepEqual(res, ["a","b"]);
      },
    },
    "as an array": {
      topic: dotty.parts(["a", "b"]),
      "should return the correct value": function(res) {
        assert.deepEqual(res, ["a", "b"]);
      },
    },
  }
}).export(module);
