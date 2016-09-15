(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var u = require('./includes/utils');

var debug = function debug(msg) {
	return console.log(msg);
};

var setupTabs = require('./components/tabbed-panel');

u.documentReady(function () {
	if (document.querySelector('[data-tab-control]')) {
		setupTabs();
	}

	var menuOpener = document.querySelector('[data-menu-opener]');
	u.addEventListener(menuOpener, 'click', function (e) {
		e.preventDefault();
		u.toggleClass(this, 'is-active');
		u.toggleClass(document.querySelector('[data-menu]'), 'is-active');
	});
});

},{"./components/tabbed-panel":2,"./includes/utils":3}],2:[function(require,module,exports){
'use strict';

var u = require('../includes/utils');

function setupTabs() {
	var elements = document.querySelectorAll('[data-tab-control]');

	for (var x = 0; x < elements.length; x++) {
		u.addEventListener(elements[x], 'click', tabClickhandler);
	}
	//Activate the first
	var event = document.createEvent('Events');
	event.initEvent('click', true, false);
	elements[0].dispatchEvent(event);
}

function tabClickhandler(e) {
	e.preventDefault();
	var active = document.querySelectorAll('[data-tab-control].is-active, [data-tab-content].is-active');
	if (active) {
		for (var y = 0; y < active.length; y++) {
			u.removeClass(active[y], 'is-active');
		}
	}
	u.addClass(this, 'is-active');
	var targetData = this.dataset.tabControl;
	var targetContent = document.querySelectorAll('[data-tab-content="' + targetData + '"]');
	for (var z = 0; z < targetContent.length; z++) {
		u.addClass(targetContent[z], 'is-active');
	}
}

module.exports = setupTabs;

},{"../includes/utils":3}],3:[function(require,module,exports){
"use strict";

module.exports = {
	getRandomInRange: getRandomInRange,
	getAnchorTarget: getAnchorTarget,
	documentReady: documentReady,
	addClass: addClass,
	hasClass: hasClass,
	removeClass: removeClass,
	toggleClass: toggleClass,
	addEventListener: addEventListener,
	getUrl: getUrl
};

function getRandomInRange(from, to) {
	return (Math.random() * (to - from) + from).toFixed(0) * 1;
}

function getAnchorTarget(link) {
	var id = link.hash.replace("#", "");
	return document.getElementById(id) || null;
}

function addClass(element, className) {
	if (element instanceof SVGElement) {
		element.setAttribute('class', element.getAttribute('class') + ' ' + className);
	} else {
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}
}

function removeClass(element, className) {
	if (element instanceof SVGElement) {
		var updatedClassListString = element.getAttribute('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
		element.setAttribute('class', updatedClassListString);
	} else {
		if (element.classList) {
			element.classList.remove(className);
		} else {
			var classes = element.className.split(' ');
			var existingIndex = classes.indexOf(className);

			if (existingIndex >= 0) {
				classes.splice(existingIndex, 1);
			}

			element.className = classes.join(' ');
		}
	}
}

function hasClass(element, className) {
	if (element instanceof SVGElement) {
		return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.getAttribute('class'));
	} else {
		if (element.classList) {
			return element.classList.contains(className);
		} else {
			return element.className.indexOf(className) !== -1;
		}
	}
}

function toggleClass(element, className) {
	if (element.classList) {
		element.classList.toggle(className);
	} else {
		var classes = element.className.split(' ');
		var existingIndex = classes.indexOf(className);

		if (existingIndex >= 0) {
			classes.splice(existingIndex, 1);
		} else {
			classes.push(className);
		}

		element.className = classes.join(' ');
	}
}

function addEventListener(el, eventName, handler) {
	if (el.addEventListener) {
		el.addEventListener(eventName, handler);
	} else {
		el.attachEvent('on' + eventName, function () {
			handler.call(el);
		});
	}
}

function getUrl(path) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	}

	if (path.indexOf('./') === 0) {
		path = path.slice(1); // Remove the .
		var existingPath = window.location.pathname || '';
		return window.location.origin + existingPath + path;
	} else if (path) {
		return window.location.origin + path;
	} else {
		return window.location.origin + window.location.pathname;
	}
}

function documentReady(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn);
	} else {
		document.attachEvent('onreadystatechange', function () {
			if (document.readyState != 'loading') fn();
		});
	}
}

},{}]},{},[1]);
