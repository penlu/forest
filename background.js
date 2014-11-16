chrome.webNavigation.onCommitted.addListener(
	function(details)
	{
		console.log("============================== NEW NODE ==============================\n")
		console.log("URL: ".concat(details.url));

		var type = details.transitionType;

		if (["link", "manual_subframe", "form_submit"].indexOf(type) != -1)		// user clicked link
		{
			console.log("Navigation: CLICK");
		}
		else if (["typed", "generated", "keyword", "keyword_generated"].indexOf(type) != -1)	// user typed something into the box
		{
			console.log("Navigation: TYPE");
		}
		else
		{
			console.log("Navigation: UNCLASSIFIED");
		}
	}
);