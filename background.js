chrome.webNavigation.onCommitted.addListener(function(details) {
	console.log("navigation detected! url is ".concat(details.url));

	var type = details.transitionType;
	if (["link", "manual_subframe", "form_submit"].indexOf(type) != -1) { // user clicked link
		console.log("clicked link!");
	} else if (["typed", "generated", "keyword", "keyword_generated"].indexOf(type) != -1) { // user typed something into the box
		console.log("typed into box!");
	} else {
		console.log("unclassified action");
	}
});