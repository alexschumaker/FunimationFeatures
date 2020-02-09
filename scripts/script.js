(function() {
	var version = "0.2.1";

	if(window.top == window) {
		console.log("Funimation Fix Activate!!", version);

		// DARK MODE STYLES
		var darkmode = document.createElement('style')
		darkmode.type = 'text/css'
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

		document.getElementsByTagName('head')[0].appendChild(darkmode)

		function setSize() {
			try{
				console.log("resize", window.innerHeight);
				var height = (window.innerHeight
					- document.getElementById("funimation-main-site-header").offsetHeight
					- document.getElementById("funimation-main-site-header").offsetTop - 5
				);

				document.getElementsByClassName("video-player-container")[0].style.maxHeight = height + "px";
				document.getElementsByClassName("video-player-section")[0].getElementsByClassName("container")[0].style.maxWidth =
					document.getElementsByClassName("video-player-container")[0].style.maxWidth = ((16 / 9) * (height)) + "px";
			}catch(err){}
		}

		window.addEventListener("load", function() {
			var script = document.createElement("script");
			script.src = chrome.runtime.getURL("scripts/inject2.js");
			document.getElementsByTagName('head')[0].appendChild(script);
		});

		window.addEventListener("resize", setSize);
		setSize();
	}

	function initPlayer() {
		console.log("FunFix Player Load");
		var script = document.createElement("script");
			script.src = chrome.runtime.getURL("scripts/inject.js");
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	if(window.location.href.indexOf("player") > 0) {
		window.addEventListener("load", initPlayer);
	}
})();
