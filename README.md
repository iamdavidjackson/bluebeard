#bluebeard

Bluebeard is a simple action and filter hooks module for NodeJS.  It should work with any Promise library however I like using [Bluebird](https://github.com/petkaantonov/bluebird) so I've paired it with that.  It borrows heavily from the Wordpress implementation of action and filter hooks in that Actions are meant to do something whereas Filters are meant to change values.

## Installation

`npm install --save bluebeard`

## Use Case

If you are building out a large project that uses promises and you want to give users the ability to inject functionality throughout the codebase without having them actually touch the core then bluebeard is maybe for you.  

Using an Action Hook you can wrap any existing promise with a "WithHooks" version to inject functionality before and after the promise runs.  This is awesome if you want to be able to instrument how long the promise took to resolve, change the flow of the application, run some side processes or whatever.  You can technically do any kind of promise based asynchronous logic here.

Using a Filter Hook you can alter the value of a variable anywhere in the codebase.  You could technically do any kind of synchronous logic here too but it's primarily for altering a variable value.

## Initialization

You can initialize bluebeard with optional hook names and filter names objects.  They should contain constants for the string representations of the action and filter hooks.  This is really useful if you're thinking that you might change the name of some hooks over time and want to be able to map old labels to new functionality. 

## Usage

There are a few examples in the examples folder but here is one of them with a basic usage.  It's unlikely that you'd use it quite like this as the idea is to be injecting the functionality into a different project but it at least shows a working example.

```
'use strict';

var Promise = require('bluebird');
var bluebeard = require('../index')();

// lets start with a string
var str = 'I eat turkey';

// we'll set up some actions that can be called
bluebeard.addAction('beforeTurkey', function(str) {
	return new Promise(function(resolve, reject) {
		// we'll add a step here
		console.log('I pour gravy on my turkey');

		// then we'll modify the inputs
		var better_str = str.replace('turkey', 'all the turkey');

		resolve(better_str);
	});
});

bluebeard.addAction('afterTurkey', function(str) {
	return new Promise(function(resolve, reject) {
		// we'll add another step here
		console.log('I eat a whole apple pie');

		resolve(str);
	});
});

// here we'll set up our core promise that we want to run
var eatTurkey = function(str) {
	return new Promise(function(resolve, reject) {
		console.log(str);
		resolve(str);
	});
}

// here we'll add some actions to make things yummier...
var eatTurkeyWithHooks = function(str) {
	return bluebeard.doAction('beforeTurkey', str)
        .then(function(str) {
            return eatTurkey(str);
        })
        .then(function(str) {
            return bluebeard.doAction('afterTurkey', str);
        });
}

// why not eat some turkey....
eatTurkey(str);

console.log('And now with hooks....');

// but why not eat turkey with hooks.... so much yummier...
eatTurkeyWithHooks(str);
```