// transition type listings
var linkTransitions = ["link", "manual_subframe", "form_submit"]
var rootTransitions = ["typed", "generated", "keyword", "keyword_generated", "auto_bookmark"]

// save a transition from one URL to another
// transitions FROM a null URL represent new roots
// transitions TO a null URL represent tab closes
function saveTransition(orig, dest) {

}

// cache storage for navigation events
var navigationEventCache = {}

chrome.webNavigation.onCommitted.addListener(
	function(details)
	{
		console.log("============================== NEW NODE ==============================")
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

		// TODO save this stuff conditionally on transitionQualifiers
		navigationEventCache[details.tabId] = {
			"transitionType": details.transitionType,
			"transitionQualifiers": details.transitionQualifiers
		}

		handleUserAction(details.tabId)
	}
)

// cache storage for tab events, specifically URL data
var tabEventCache = {}

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		console.log("~~~~~~~~~~~~~~~~~~ TAB UPDATED ~~~~~~~~~~~~~~~~~~")
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

chrome.tabs.onCreated.addListener(
	function(tab) {
		console.log("~~~~~~~~~~~~~~~~~~ TAB CREATED ~~~~~~~~~~~~~~~~~~")
		console.log("New Tab ID: ".concat(tab.tabId))
		console.log("New Tab URL: ".concat(tab.url))
	}
)

chrome.tabs.onReplaced.addListener(
	function(addedTabId, removedTabId) {
		console.log("~~~~~~~~~~~~~~~~~~ TAB REPLACED ~~~~~~~~~~~~~~~~~~")
		console.log("Added Tab: ".concat(addedTabId))
		console.log("Removed Tab: ".concat(removedTabId))

		var addedTabInfo = chrome.tabs.get(addedTabId, function(tab) {
			console.log("Added Tab URL: ".concat(tab.url))
			if (typeof tab.url !== "undefined") {
				tabEventCache[addedTabId] = {
					"url": tab.url
				}
			}
		})
		
		tabRemoved(removedTabId)

		handleUserAction(addedTabId)
	}
)

// removes events from caches when tab is removed
function tabRemoved(tabId)
{
	console.log("~~~~~~~~~~~~~~~~~~ TAB REMOVED ~~~~~~~~~~~~~~~~~~")
	console.log("Tab Removed: ".concat(tabId))
	delete navigationEventCache[tabId]
	delete tabEventCache[tabId]
}
chrome.tabs.onRemoved.addListener(tabRemoved)

// keep track of current active tab
var activeTab = -1

chrome.tabs.onActivated.addListener(
	function (activeInfo)
	{
		activeTab = activeInfo.tabId
	}
)

// called after piece of user data has been contributed
// if all user data has been aggregated, then perform navigation saving etc
function handleUserAction(tabId) {
	console.log("Handle user action call, tab ID: ".concat(tabId))
	if (typeof navigationEventCache[tabId] !== "undefined" && typeof tabEventCache[tabId] !== "undefined") {
		console.log("!!!!!!!!!!!! HANDLING NOW !!!!!!!!!!!!")
		var userAction = {
			"url": tabEventCache[tabId].url,
			"transitionType": navigationEventCache[tabId].transitionType,
			"transitionQualifiers": navigationEventCache[tabId].transitionQualifiers
		}
		console.log("Handled URL: ".concat(userAction.url))
		console.log("Handled Transition Type: ".concat(userAction.transitionType))
		console.log("Handled Transition Qualifiers: ".concat(userAction.transitionQualifiers))
		delete navigationEventCache[tabId]
		delete tabEventCache[tabId]
	}
}