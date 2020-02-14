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

chrome.webNavigation.onCommitted.addListener(function(details) {
	if (details.frameId !== 0) return;

	console.log(chrome.storage.FFDarkEnabled)
	if (chrome.storage.sync.FFDarkEnabled || chrome.storage.sync.FFDarkEnabled === undefined) {
		chrome.tabs.insertCSS(details.tabID, {
			file: "styles/DarkMode.css",
			runAt: "document_start"
		})
	}
});