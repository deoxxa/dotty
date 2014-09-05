(MAINTAINED Version)
* note: After Dotty fell into the hole of forgotten projects, I have uploaded this module. I will work to get the current pull requests merged into my branch as well as improve any existing functionality as best I can without breaking backwards compatibility with Dotty.

Dotty (Maintained as "dotty-bindable" on NPM) [![build status](https://secure.travis-ci.org/miketheprogrammer/dotty.png)](http://travis-ci.org/miketheprogrammer/dotty)
=====

Access properties of nested objects using dot-path notation.

Overview
--------

Dotty makes it easy to programmatically access arbitrarily nested objects and
their properties.


Installation
------------

Here's a link to the [npm](https://npmjs.org/package/dotty) page. 

	npm install dotty


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

console.log(dotty.remove(object, "a.b.x"));
console.log(dotty.remove(object, "a.b.y"));

console.log(dotty.deepKeys(object));
console.log(dotty.deepKeys(object, {leavesOnly: true}));
console.log(dotty.deepKeys(object, {leavesOnly: true, asStrings: true}));

console.log(object);
```

Binding and Currying
----
- Note please read below for the one Caveat of this new feature, which affects put.
```javascript
var obj = 
{
  user: {
    name: {
      primary: "John",
      surname: "Doe"
    },
    age: 26,
    location: {
      city: "New York",
      region: "New York",
      region_abbrev: "NY",
    }
  }
}
// Dotty GET - supports dot and array notation and single string mixed in, as long as arguments length > 2
var user = dotty.get.bind(null, obj, ['user']);

var name
// name can either inherit from user, or from obj lets see both in action

name = user.bind(null, ['name']);

console.log('Curried from user object')
console.log(name('primary'));

console.log('Curried from top level object');
name = dotty.get.bind(null, obj, ['user'], 'name');

console.log(name('primary'));
console.log(name('surname'));
console.log('Accessed via return name as an object and just accessing its properties.');
console.log(name().primary);
console.log(name().surname);

console.log('Let try make a function to dynamically return the city even if it is changed from somewhere else in the program');

console.log('Curry from top level object');
var city = dotty.get.bind(null, obj)
                .bind(null, 'user.location')
                .bind(null, 'city');

// Nottice we used 3 binds, this does not really matter, it could have been one, it is just to prove the point of currying.

console.log('My city is ' + city() );
console.log('someones changing my city');
obj.user.location.city = 'Albany';
console.log('My city is now ' + city() );

// The Same applies to PUT EXISTS REMOVE SEARCH
// HOWEVER one caveat does exist for PUT, the last argument will never be deconstructed, it is strictly the value.

console.log('Now showing PUT caveat');
// So in the syntax
obj1 = {a: { b: {c: {d: { e: 1}}}}}
var ans = dotty.get(obj1, 'a', 'b', 'c', ['d', 'e']);
// the last item is an array and is deconstructed to be
console.log(ans);
obj1['a']['b']['c']['d']['e'];

dotty.put(obj1, 'a', 'b', 'c', ['d', 'e']);
// The last item is strictly a value and is not deconstructed
console.log(dotty.get(obj1, 'a', 'b', 'c'));
// output: ['d', 'e']
// Thus this is essentially equal to
obj1['a']['b']['c'] = ['d', 'e'];

```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([http://github.com/deoxxa](deoxxa))
* Twitter ([http://twitter.com/deoxxa](@deoxxa))
* Email ([mailto:deoxxa@fknsrs.biz](deoxxa@fknsrs.biz))
