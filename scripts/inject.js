(function() {
	var videoPlayer;
	window.BlockAdBlock = function(data){
		function onDetected(){}
		function onNotDetected(){}
		function check(){}
	};

	function initInject() {
		console.log("Funimation Fix Injected");	
		var videos = document.getElementsByTagName("video");

		if(videos.length > 0) {
			videoPlayer = videos[0];
			initControls();
		}
	}

	function initControls() {
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
		} else setTimeout(initControls, 100);
	}

	function initListener() {
		videoPlayer.addEventListener("timeupdate", timeUpdate);

		$(document).keydown(function(e) {
			// console.log(e.which)
			// e.preventDefault();
			// try{e.stopPropagation();}catch(err){}
			switch (e.which) {
				case 37: // left arrow
					if (!(e.metaKey || e.ctrlKey)) {
						// $('#funimation-control-back').trigger('click');
						videoPlayer.currentTime = videoPlayer.currentTime - 5
					}
					break;
				case 38: // ctrl/meta + up arrow
					if(e.ctrlKey || e.metaKey) {
						increaseRate();
					}
					break;
				case 39: // right arrow
					if (!(e.metaKey || e.ctrlKey)) {
						// $('#funimation-control-forward').trigger('click');
						videoPlayer.currentTime = videoPlayer.currentTime + 5
					}
					break;
				case 40: // ctrl/meta + down arrow
					if(e.ctrlKey || e.metaKey) {
						decreaseRate();
					}
					break;
				case 83: // s key
					if (!e.metaKey || e.ctrlKey) {
						videoPlayer.currentTime = videoPlayer.currentTime + 82
					}
				case 48: // ctrl/meta + 0
					if(e.ctrlKey || e.metaKey) {
						videoPlayer.playbackRate = 1;
						videoPlayer.playbackDisplay.innerHTML = "<span>" + videoPlayer.playbackRate + "</span>";
						console.log("FuniFix Rate Reset", videoPlayer.playbackRate);
					}
					break;
				case 70: // F
					$('#funimation-control-fullscreen').trigger('click');
					break;
				default:
					break;
			}
		});

		$("#funimation-gradient, video").on("click", function(){
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

	function increaseRate() {
		if(videoPlayer.playbackRate < .25)
			videoPlayer.playbackRate = .25;
		else if(videoPlayer.playbackRate < .5)
			videoPlayer.playbackRate = .5;
		else if(videoPlayer.playbackRate < .75)
			videoPlayer.playbackRate = .75;
		else if(videoPlayer.playbackRate < 1)
			videoPlayer.playbackRate = 1;
		else if(videoPlayer.playbackRate < 1.25)
			videoPlayer.playbackRate = 1.25;
		else if(videoPlayer.playbackRate < 1.5)
			videoPlayer.playbackRate = 1.5;
		else if(videoPlayer.playbackRate < 2)
			videoPlayer.playbackRate = 2;
		else if(videoPlayer.playbackRate < 4)
			videoPlayer.playbackRate = 4;
		else if(videoPlayer.playbackRate < 6)
			videoPlayer.playbackRate = 6;
		console.log("FuniFix Rate Up", videoPlayer.playbackRate);

		videoPlayer.playbackDisplay.innerHTML = "<span>" + videoPlayer.playbackRate + "</span>";
		if($('#funimation-popover-volume input').val() < 1)
			setTimeout(() => $('#funimation-popover-volume input').val(parseFloat($('#funimation-popover-volume input').val()) - 0.1).change());
	}

	function decreaseRate() {
		if(videoPlayer.playbackRate > 4)
			videoPlayer.playbackRate = 4;
		else if(videoPlayer.playbackRate > 2)
			videoPlayer.playbackRate = 2;
		else if(videoPlayer.playbackRate > 1.5)
			videoPlayer.playbackRate = 1.5;
		else if(videoPlayer.playbackRate > 1.25)
			videoPlayer.playbackRate = 1.25;
		else if(videoPlayer.playbackRate > 1)
			videoPlayer.playbackRate = 1;
		else if(videoPlayer.playbackRate > .75)
			videoPlayer.playbackRate = .75;
		else if(videoPlayer.playbackRate > .5)
			videoPlayer.playbackRate = .5;
		else if(videoPlayer.playbackRate > .25)
			videoPlayer.playbackRate = .25;
		console.log("FuniFix Rate Down", videoPlayer.playbackRate);

		videoPlayer.playbackDisplay.innerHTML = "<span>" + videoPlayer.playbackRate + "</span>";

		if($('#funimation-popover-volume input').val() > 0)
			setTimeout(() => $('#funimation-popover-volume input').val(parseFloat($('#funimation-popover-volume input').val()) + 0.1).change());
	}

	/*function playerFunctionInvocation(invoke){
		console.log("Invoke", invoke);
		if(fun != "toggleVideoPlayback")
			fp[invoke]();
		else $('#funimation-control-playback').click();
	}

	window.addEventListener("message", function(event) {
		if (event.source != window)
			return;
		if (event.data.type && (event.data.type == "PLAYER_INVOCATION")) {
			//console.log("Content script received: " + event.data.text);
			playerFunctionInvocation(event.data.text)
		}
	}, false);*/

	initInject();
})();
