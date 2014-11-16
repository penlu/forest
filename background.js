chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
	console.log("navigation detected! url is ".concat(details.url));
})