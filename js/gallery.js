function openVideo(element) {
const videoPath = element.getAttribute('data-video');
const modal = document.getElementById('videoModal');
const video = document.getElementById('cityVideo');
const source = document.getElementById('videoSource');

source.src = videoPath;
video.load();
modal.style.display = 'flex';
video.muted = true;
video.play();
}

function closeVideo() {
const modal = document.getElementById('videoModal');
const video = document.getElementById('cityVideo');

video.pause();
video.currentTime = 0;
modal.style.display = 'none';
}
