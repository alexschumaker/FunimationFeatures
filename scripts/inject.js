// Functionality for when the video player is focused.

(function() {
	// Find out if we're running this on the video player iframe or on the rest of the page
	// then set these variables according to scope
	var playerFocus = false
	var videoPlayer
	var playerDoc
	if (window.location.href.indexOf("player") > 0) {
		playerFocus = true
		videoPlayer = document.getElementsByTagName("video")[0]
		playerDoc = document
	}
	else {
		videoPlayer = document.getElementById('player').contentDocument.getElementsByTagName('video')[0]
		playerDoc = document.getElementById('player').contentDocument
	}

	console.log("Injected FunimationFeatures into " + (playerFocus ? "player." : "page."))

	// add keybinds!
	$(document).keydown(function(e) {
		// e.preventDefault();
		// try{e.stopPropagation();}catch(err){}

		switch (e.which) {
			case 37: // left arrow
				if (!(e.metaKey || e.shiftKey)) {
					// $('#funimation-control-back').trigger('click');
					videoPlayer.currentTime = videoPlayer.currentTime - 5
				}
				break;
			case 38: // shift/meta + up arrow
				if(e.shiftKey || e.metaKey) {
					speedControl(true);
				}
				else if (videoPlayer.volume < 1) {
					e.preventDefault();
					videoPlayer.volume = videoPlayer.volume + .1
				}
				break;
			case 39: // right arrow
				if (!(e.metaKey || e.ctrlKey)) {
					// $('#funimation-control-forward').trigger('click');
					videoPlayer.currentTime = videoPlayer.currentTime + 5
				}
				break;
			case 40: // shift/meta + down arrow
				if(e.shiftKey || e.metaKey) {
					speedControl(false);
				}
				else if (videoPlayer.volume > 0) {
					e.preventDefault();
					videoPlayer.volume = videoPlayer.volume - .1
				}
				break;
			case 83: // s key
				if (!e.metaKey || e.shiftKey) {
					videoPlayer.currentTime = videoPlayer.currentTime + 82
				}
				break;
			case 32:  // spacebar
				if (!playerFocus && (!e.metaKey || e.ctrlKey)) {
					e.preventDefault();
					// videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
					playerDoc.getElementById('funimation-control-playback').click()
				}
				break;
			case 48: // shift/meta + 0
				if(e.shiftKey || e.metaKey) {
					videoPlayer.playbackRate = 1;
					videoPlayer.playbackDisplay.innerHTML = "<span>" + videoPlayer.playbackRate + "</span>";
				}
				break;
			case 70: // F
				playerDoc.getElementById('funimation-control-fullscreen').click()
				break;
			default:
				break;
			}
	});

	function speedControl(up) {
		if (up) {
			if (videoPlayer.playbackRate < 4) {
				videoPlayer.playbackRate = videoPlayer.playbackRate + .25
			}
		}
		else {
			if (videoPlayer.playbackRate > .25) {
				videoPlayer.playbackRate = videoPlayer.playbackRate - .25
			}
		}

		videoPlayer.playbackDisplay.innerHTML = "<span>" + videoPlayer.playbackRate + "</span>";
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// VideoPlayer-only functions (stuff that doesn't need to be run on other sections of the page) //
	//////////////////////////////////////////////////////////////////////////////////////////////////
	if (playerFocus) {
		initUI();
	}

	// this is some really nice ui code from the original FunimationFix!
	function initUI() {
		if(document.getElementsByClassName("funimation-controls-right").length > 0) {
			var playback = document.createElement("div");
				playback.id = "playback";
				playback.className = "funimation-control funifix-control";
				playback.style.width = "20px";
				playback.innerHTML = "<span>" + videoPlayer.playbackRate + "</span>";
			var currentTime = document.createElement("div");
				currentTime.id = "currentTime";
				currentTime.className = "funimation-control funifix-control";
				currentTime.style.width = "160px";
				currentTime.innerHTML = "<span>0:00 / 0:00</span>";

			var controls = document.getElementsByClassName("funimation-controls-right")[0];
				controls.insertBefore(playback, controls.firstChild);
				controls.insertBefore(currentTime, controls.firstChild);

			videoPlayer.playbackDisplay = playback;
			videoPlayer.currentTimeDisplay = currentTime;

			initListener();

		} else setTimeout(initUI, 100);
	}

	var lastClickTime = 0
	function initListener() {
		videoPlayer.addEventListener("timeupdate", timeUpdate);

		$("#funimation-gradient, video").on("click", function(){
			var thisClickTime = new Date().getTime();
			if (thisClickTime - lastClickTime < 400) {
				playerDoc.getElementById('funimation-control-fullscreen').click()
			}

			lastClickTime = thisClickTime
			$('#funimation-control-playback').click();
		});
	}

	function timeUpdate(e) {
		videoPlayer.currentTimeDisplay.innerHTML = "<span>" + getDisplayTime(e.target.currentTime) + " / " + getDisplayTime(e.target.duration) +"</span>";
	}

	function getDisplayTime(time) {
		if(isNaN(time))
			return "0:00";
		var seconds = parseInt(time % 60);
		var minutes = parseInt((time / 60) % 60);
		return  minutes + ":" + (seconds < 10 ? "0":"") + seconds;
	}
})();
