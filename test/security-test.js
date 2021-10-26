const dotty = require("../lib/index"),
  vows = require("vows"),
  assert = require("assert");

vows
  .describe("security")
  .addBatch({
    "When we attempt to update the prototype": {
      topic() {
        const obj = {};
        dotty.put(obj, "__proto__.polluted", "Muhahahaha");
        return obj;
      },
      "it should not update": function (res) {
        assert.equal(res.polluted, undefined);
        assert.equal(Object.prototype.polluted, undefined);
      },
    },
    "When we attempt to update the prototype using an array": {
      topic() {
        const obj = {};
        dotty.put(obj, ["__proto__", "polluted"], "Muhahahaha");
        return obj;
      },
      "it should not update": function (res) {
        assert.equal(res.polluted, undefined);
        assert.equal(Object.prototype.polluted, undefined);
      },
    },
    "When we attempt to update the prototype using a non-string": {
      topic() {
        const obj = {};
        dotty.put(obj, [["__proto__"], "polluted"], "Muhahahaha");
        return obj;
      },
      "it should not update": function (res) {
        assert.equal(res.polluted, undefined);
        assert.equal(Object.prototype.polluted, undefined);
      },
    },
    "When we attempt to update the constructor prototype": {
      topic() {
        const obj = {};
        dotty.put(obj, "constructor.prototype.polluted", "Muhahahaha");
        return obj;
      },
      "it should not update": function (res) {
        assert.equal(res.polluted, undefined);
      },
    },
  })
  .export(module);
