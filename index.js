/*!
 * bluebeard
 * Copyright(c) 2014-2015 David Jackson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */
var Promise = require('bluebird');

var addAction, doAction, defaultAction;
var addFilter, applyFilter;

var hooks = {};
var filters = {};

var hookNames = {};
var filterNames = {};

/**
 * Module exports.
 * @type {Bluebeard}
 */

exports = module.exports = function (/*_hookNames, _filterNames*/) {
	
	if(typeof _hookNames !== 'undefined') {
		hookNames = _hookNames;
	}

	if(typeof _filterNames !== 'undefined') {
		filterNames = _filterNames;
	}

	return {
		addAction: addAction,
		doAction: doAction,
		HOOKS: hookNames,
		addFilter: addFilter,
		applyFilter: applyFilter,
		FILTERS: filterNames
	};
	
};

addAction = function(name, fn /*[ args ]*/) {
	hooks[name] = fn;
};

doAction = function(/*[ name, args ]*/ ) {
	var name = Array.prototype.shift.apply(arguments);
	

	// check if we have a hook for this yet
	if(typeof hooks[name] !== 'undefined') {
		return hooks[name].apply(this, arguments);
	} else {
		return defaultAction.apply(this, arguments);
	}
};

defaultAction = function(/*[ args ]*/) {
	var parentArgs = arguments;

	return new Promise(function(resolve, reject) {
		if(parentArgs.length > 1) {
			resolve(Array.prototype.slice.call(parentArgs));	
		} else {
			resolve(parentArgs[0]);
		}
	});
};

addFilter = function(name, fn) {
	filters[name] = fn;
};

applyFilter = function(name, variable) {
	// check if we have a filter for this yet
	if(typeof filters[name] !== 'undefined') {
		return filters[name].call(this, variable);
	} else {
		return variable;
	}
};