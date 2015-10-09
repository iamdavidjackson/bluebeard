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
