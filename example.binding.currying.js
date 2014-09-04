// Now Dotty Support BINDING and Currying
var dotty = require('./lib/index');

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
