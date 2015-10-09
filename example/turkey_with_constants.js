'use strict';

var Promise = require('bluebird');

// create some constants for bluebeard to load in for you,
// this is useful if you think you might be renaming hooks 
// in the future.  You can just map the old names to the new
// ones.

var hookNames = {
	BEFORE_TURKEY: 'beforeTurkey',
	AFTER_TURKEY: 'afterTurkey'
};

// pass the hook name constants in to bluebeard
var bluebeard = require('../index')(hookNames);

// lets start with a string
var str = 'I eat turkey';

// we'll set up some actions that can be called
bluebeard.addAction(bluebeard.HOOKS.BEFORE_TURKEY, function(str) {
	return new Promise(function(resolve, reject) {
		// we'll add a step here
		console.log('I pour gravy on my turkey');

		// then we'll modify the inputs
		var better_str = str.replace('turkey', 'all the turkey');

		resolve(better_str);
	});
});

bluebeard.addAction(bluebeard.HOOKS.AFTER_TURKEY, function(str) {
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
	return bluebeard.doAction(bluebeard.HOOKS.BEFORE_TURKEY, str)
        .then(function(str) {
            return eatTurkey(str);
        })
        .then(function(str) {
            return bluebeard.doAction(bluebeard.HOOKS.AFTER_TURKEY, str);
        });
}

// why not eat some turkey....
eatTurkey(str);

console.log('And now with hooks....');

// but why not eat turkey with hooks.... so much yummier...
eatTurkeyWithHooks(str);
