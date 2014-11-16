var linkTransitions = ["link", "manual_subframe", "form_submit"]
var rootTransitions = ["typed", "generated", "keyword", "keyword_generated", "auto_bookmark"]

chrome.webNavigation.onCommitted.addListener(
	function(details)
	{
		console.log("============================== NEW NODE ==============================\n")
		console.log("URL: ".concat(details.url))

		var type = details.transitionType
		console.log("Type: ".concat(type))

		if (linkTransitions.indexOf(type) != -1)		// user clicked link
		{
			console.log("Navigation: LINK")
		}
		else if (rootTransitions.indexOf(type) != -1)	// user typed something into the box
		{
			console.log("Navigation: ROOT")
		}
		else
		{
			console.log("Navigation: IGNORE")
		}
	}
);

chrome.tabs.onRemoved.addListener(
	function (tabId)
	{
		var thisTab = tabId
	}
);

chrome.tabs.onActivated.addListener(
	function (activeInfo)
	{
		var thisTab = activeInfo.tabId
	}
);