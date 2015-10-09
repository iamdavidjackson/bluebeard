'use strict';

var Promise = require('bluebird');
var bluebeard = require('../index')();

// lets start with a string
var str = 'I eat turkey';

// we'll set up a filter that can be called
bluebeard.addFilter('moreTurkey', function(str) {
	return str.replace('turkey', 'all the turkey');
});

// here we'll set up our core promise that we want to run
var eatTurkey = function(str) {
	return new Promise(function(resolve, reject) {
		console.log(str);
		resolve(str);
	});
}

// why not eat some turkey....
eatTurkey(str);

console.log('And now with filters....');

// but why not eat turkey with filters.... so much yummier...
eatTurkey(bluebeard.applyFilter('moreTurkey', str));


