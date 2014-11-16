chrome.webNavigation.onCommitted.addListener(function(details) {
	console.log("navigation detected! url is ".concat(details.url));
	console.log("transition type: ".concat(details.transitionType));
	console.log("transition qualifiers: ".concat(details.transitionQualifiers));
});