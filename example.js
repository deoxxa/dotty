var dotty = require("./lib/index");

var object = {
  a: {
    b: {
      x: "y",
    },
    c: {
      x: "z",
    },
  },
};

console.log(dotty.exists(object, "a.b.x")); // true
console.log(dotty.exists(object, ["a", "b", "x"])); // true
console.log(dotty.exists(object, "a.b.z")); // false
console.log(dotty.exists(object, ["a", "b", "z"])); // false

console.log(dotty.get(object, "a.b.x")); // "y"
console.log(dotty.get(object, ["a", "b", "x"])); // "y"
console.log(dotty.get(object, "a.b.z")); // undefined
console.log(dotty.get(object, "a.b.z.z"));  // undefined
console.log(dotty.get(object, ["a", "b", "z"])); // undefined

dotty.put(object, "a.b.hello", "hi");
dotty.put(object, ["a", "c", "yo"], "sup");

console.log(dotty.search(object, "a.b.*")); // ["y", "hi"]
console.log(dotty.search(object, ["a", "b", "*"])); // ["y", "hi"]
console.log(dotty.search(object, "a.*.x")); // ["y", "z"]
console.log(dotty.search(object, ["a", "*", "x"]));  // ["y", "z"]
console.log(dotty.search(object, ["a", "*", /..+/]));  // ["hi", "sup"]

console.log(dotty.remove(object, "a.b.x"));
console.log(dotty.remove(object, "a.b.y"));

console.log(dotty.deepKeys(object));
/**
  [
    [ 'a' ],
    [ 'a', 'b' ],
    [ 'a', 'b', 'hello' ],
    [ 'a', 'c' ],
    [ 'a', 'c', 'x' ],
    [ 'a', 'c', 'yo' ]
  ]
 */

console.log(dotty.deepKeys(object, {leavesOnly: true}));
/**
  [
    [ 'a', 'b', 'hello' ],
    [ 'a', 'c', 'x' ],
    [ 'a', 'c', 'yo' ]
  ]
 */

console.log(dotty.deepKeys(object, {leavesOnly: true, asStrings: true}));
/**
  [
    'a.b.hello',
    'a.c.x',
    'a.c.yo'
  ]
 */

console.log(object);
/**
  {
    a: {
      b: {
        hello: "hi"
      },
      c: {
        x: "z',
        yo: 'sup'
      }
    }
  }
 */
