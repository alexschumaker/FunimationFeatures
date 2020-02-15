(function() {

	var darkmode = document.createElement('style')
		darkmode.type = 'text/css'
		darkmode.id = 'FFDark'
		darkmode.appendChild(document.createTextNode(
				`body, .panel-title {
					background: #1b1b1b;
					color: white;
				}

				.panel {
					background: #1b1b1b;
				}

				header {
					background: darkgray;
					box-shadow: 0px 10px 30px black;
				}

				a {
					color: darkgray;
				}

				#comments-section a:hover {
					color: #e30046;
				}

				#comments-section a {
					background: #1b1b1b;
				}`
			))

	chrome.storage.sync.get(['FFDarkEnabled'], function(result) {
		console.log(result)
		if (result.FFDarkEnabled || result.FFDarkEnabled === undefined) {
			document.getElementsByTagName('head')[0].appendChild(darkmode)
		}
	});
	
	chrome.runtime.onMessage.addListener(function(msg, sender, response) {
		if (msg.from === "FFBackground" && msg.subject === "toggle") {
			toggleDarkMode()
		}
	});

	function toggleDarkMode() {
		chrome.storage.sync.get(['FFDarkEnabled'], function(result) {
			if (result.FFDarkEnabled === false) {
				document.getElementsByTagName('head')[0].appendChild(darkmode)
				chrome.storage.sync.set({'FFDarkEnabled': true})
			}
			else {
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('FFDark'))
				chrome.storage.sync.set({'FFDarkEnabled': false})
			}
		}
	)};
})();
