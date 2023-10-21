import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe, {
    loop: true,
    fullscreen: true,
    quality: '1080p',
  });
  const STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(function(event) {
  localStorage.setItem(STORAGE_KEY, event.seconds);
}, 1000));

document.addEventListener('DOMContentLoaded', function() {
  const savedTime = localStorage.getItem(STORAGE_KEY);
  
  if (savedTime) {
    player.ready().then(function() {
      player.setCurrentTime(savedTime);
    });
  }
});