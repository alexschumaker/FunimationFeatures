// chrome.runtime.onInstalled.addListener(function() {
// 	chrome.tabs.onActivated.addListener(function (tabs) {
// 		chrome.pageAction.show(tabs.tabId);
// 	});
// });

chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.sendMessage(tab.id, {
		from: "FFBackground",
		subject: "toggle"
	})
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg.subject === 'showPageAction') {
		chrome.pageAction.show(sender.tab.id);
	}
});