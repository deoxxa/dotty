# Dotty ![Build and Test](https://github.com/deoxxa/dotty/workflows/Build%20and%20Test/badge.svg) [![npm](https://img.shields.io/npm/v/dotty.svg)](https://www.npmjs.com/package/dotty)

Access properties of nested objects using dot-path notation.

## Overview

Dotty makes it easy to programmatically access arbitrarily nested objects and
their properties.

## Installation

Here's a link to the [npm](https://npmjs.org/package/dotty) page.

    npm install dotty

## Usage

Also see the [documentation](https://deoxxa.github.io/dotty/docs/) and
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
console.log(dotty.get(object, ["a", "b", "z"])); // undefined

dotty.put(object, "a.b.hello", "hi");
dotty.put(object, ["a", "c", "yo"], "sup");

console.log(dotty.search(object, "a.b.*"));
console.log(dotty.search(object, ["a", "b", "*"]));
console.log(dotty.search(object, "a.*.x"));
console.log(dotty.search(object, ["a", "*", "x"]));
console.log(dotty.search(object, ["a", "*", /..+/]));
console.log(
  dotty.search(object, "a.b.*", function (value, parent, key) {
    parent[key] = value + "!";
  })
);

console.log(dotty.remove(object, "a.b.x"));
console.log(dotty.remove(object, "a.b.y"));

console.log(dotty.removeSearch(object, "a.*.x"));

console.log(dotty.deepKeys(object));
console.log(dotty.deepKeys(object, { leavesOnly: true }));
console.log(dotty.deepKeys(object, { leavesOnly: true, asStrings: true }));

console.log(object);
```

## License

3-clause BSD. A copy is included with the source.

## Contact

- GitHub ([deoxxa](https://github.com/deoxxa))
- Twitter ([@deoxxa](https://twitter.com/deoxxa))
- Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
