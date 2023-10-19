import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe, {
    loop: true,
    fullscreen: true,
    quality: '1080p',
  });

player.on('timeupdate', throttle(function(event) {
  console.log('Поточний час:', event.seconds);
  localStorage.setItem('videoplayer-current-time', event.seconds);
}, 1000));

document.addEventListener('DOMContentLoaded', function() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  
  if (savedTime) {
    player.ready().then(function() {
      player.setCurrentTime(savedTime);
    });
  }
  
  console.log('Збережений час:', savedTime);
});