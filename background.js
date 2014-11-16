// transition type listings
var linkTransitions = ["link", "manual_subframe", "form_submit"]
var rootTransitions = ["typed", "generated", "keyword", "keyword_generated", "auto_bookmark"]

// save a transition from one URL to another
// transitions FROM a null URL represent new roots
// transitions TO a null URL represent tab closes
function saveTransition(orig, dest) {

}

// called after piece of user data has been contributed
// if all user data has been aggregated, then 
function handleUserAction(tabId) {
	console.log("Tab ID: ".concat(tabId))
}

// cache storage for navigation events
var navigationEventCache = {}

chrome.webNavigation.onCommitted.addListener(
	function(details)
	{
		console.log("============================== NEW NODE ==============================\n")
		console.log("URL: ".concat(details.url))

		var type = details.transitionType
		console.log("Type: ".concat(type.toUpperCase()))

		if (linkTransitions.indexOf(type) != -1)		// user clicked link
		{
			console.log("Navigation: LINK")
		}
		else if (rootTransitions.indexOf(type) != -1)	// user typed something into the box
		{
			console.log("Navigation: ROOT")
		}
		else	// something else (do nothing)
		{
			console.log("Navigation: IGNORE")
		}

		handleUserAction(details.tabId)
	}
)

// cache storage for tab events, specifically URL data
var tabEventCache = {}

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		console.log("================== TAB ==================")
		console.log("Tab URL: ".concat(changeInfo.url))

		if (typeof changeInfo.url !== "undefined") {
			tabEventCache[tabId] = {
				"url": changeInfo.url
			}
		}

		// attempt to handle an action
		handleUserAction(tabId)
	}
)

chrome.tabs.onRemoved.addListener(
	function (tabId)
	{
		var thisTab = tabId
	}
)

chrome.tabs.onActivated.addListener(
	function (activeInfo)
	{
		var thisTab = activeInfo.tabId
	}
)
