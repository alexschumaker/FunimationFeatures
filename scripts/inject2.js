(function() {
	var playerDoc = document.getElementById('player').contentDocument
	var videoPlayer = playerDoc.getElementsByTagName('video')[0]

	$(document).keydown(function(e) {
		// e.preventDefault();
		// try{e.stopPropagation();}catch(err){}
		switch (e.which) {
			case 37: // left arrow
				if (!(e.metaKey || e.ctrlKey)) {
					// $('#funimation-control-back').trigger('click');
					videoPlayer.currentTime = videoPlayer.currentTime - 5
				}
				break;
			case 39: // right arrow
				if (!(e.metaKey || e.ctrlKey)) {
					// $('#funimation-control-forward').trigger('click');
					videoPlayer.currentTime = videoPlayer.currentTime + 5
				}
				break;
			case 83: // s key
				if (!e.metaKey || e.ctrlKey) {
					videoPlayer.currentTime = videoPlayer.currentTime + 82
				}
				break;
			case 32:  // spacebar
				if (!e.metaKey || e.ctrlKey) {
					e.preventDefault();
					videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
				}
				break;
			case 70: // F
				// $('#funimation-control-fullscreen').trigger('click');
				playerDoc.getElementById('funimation-control-fullscreen').click()
				break;
			default:
				break;
		}
	});
})();
