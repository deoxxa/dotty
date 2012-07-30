Dotty
=====

Access properties of nested objects using dot-path notation.

Overview
--------

Dotty makes it easy to programmatically access arbitrarily nested objects and
their properties.

Usage
-----

Also see the [documentation](http://deoxxa.github.com/dotty/docs/) and
[example](example.js).

```javascript
var dotty = require("dotty");

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
console.log(dotty.get(object, ["a", "b", "z"])); // undefine

dotty.put(object, "a.b.hello", "hi");
dotty.put(object, ["a", "c", "yo"], "sup");

console.log(dotty.search(object, "a.b.*"));
console.log(dotty.search(object, ["a", "b", "*"]));
console.log(dotty.search(object, "a.*.x"));
console.log(dotty.search(object, ["a", "*", "x"]));
console.log(dotty.search(object, ["a", "*", /..+/]));

console.log(object);
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([http://github.com/deoxxa](deoxxa))
* Twitter ([http://twitter.com/deoxxa](@deoxxa))
* Email ([mailto:deoxxa@fknsrs.biz](deoxxa@fknsrs.biz))
