var dotty = require("../lib/index"),
  vows = require("vows"),
  assert = require("assert");

vows
  .describe("security")
  .addBatch({
    "When we attempt to update the prototype": {
      topic() {
        var obj = {};
        dotty.put(obj, "__proto__.polluted", "Muhahahaha");
        return obj;
      },
      "it should not update": function (res) {
        // assert.equal(res.__proto__.polluted, undefined);
        assert.equal(res.polluted, undefined);
      },
    },
    "When we attempt to update the constructor prototype": {
      topic() {
        var obj = {};
        dotty.put(obj, "constructor.prototype.polluted", "Muhahahaha");
        return obj;
      },
      "it should not update": function (res) {
        // assert.equal(res.__proto__.polluted, undefined);
        assert.equal(res.polluted, undefined);
      },
    },
  })
  .export(module);
