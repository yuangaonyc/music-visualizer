import cloudInit from './_clouds';
import starInit from './_stars';
import analyserInit from './_analyser';
import { removeNode } from './_util';

// play list
window.trackID = 2;
window.skippingEnabled = true;
window.sounds = [
  './assets/sounds/Marshmello-Alone.mp3',
  './assets/sounds/Hellberg-TheGirl.mp3',
  './assets/sounds/Volant-Minty.mp3',
  './assets/sounds/Nanobii-RainbowRoad.mp3',
  './assets/sounds/PegboardNerds-Disconnected.mp3',
];
window.themes = [
  'rgba(144,24,48,1)',
  'rgba(7, 132, 221, 1)',
  'rgba(10, 151, 84, 1)',
  'rgba(241, 34, 133, 1)',
  'rgba(229, 206, 6, 1)',
];
window.albumArts = [
  './assets/images/marshmello.jpg',
  './assets/images/hellberg.jpg',
  './assets/images/volant.jpg',
  './assets/images/nanobii.png',
  './assets/images/pegboard-nerds.jpg',
];
window.artists = [
  'marshmello',
  'hellberg',
  'volant',
  'nanobii',
  'pegboard nerds',
];
window.songs = [
  'alone',
  'the girl',
  'minty',
  'rainbow road',
  'disconnected',
];

// clouds configuration
const cloudCount = 20;
const maxXVelocity = 0.5;
const maxYVelocity = 0.1;
const canvasWidth = $(window).width();
const canvasHeight = $(window).height();
const minCloudHeight = 300;
const maxCloudHeight = 600;
const fps = 30;
const clouds = [];

// stars configuration
const starCount = 400;
const maxRadius = 2;
const stars = [];
window.starVelocity = 0;

// css
document.querySelector('#album_art').style.cssText = `top: ${$(window).height() / 2 + 30}px;`;
document.querySelector('#arrow_left').style.cssText = `top: ${$(window).height() / 2 + 52}px;`;
document.querySelector('#arrow_right').style.cssText = `top: ${$(window).height() / 2 + 52}px;`;

// hide skip arrows and links
let hide;
document.querySelector('body').onmousemove = () => {
  clearTimeout(hide);
  document.querySelector('#arrow_left').style.display = 'inline';
  document.querySelector('#arrow_right').style.display = 'inline';
  document.querySelector('#links').style.display = 'inline';
  hide = setTimeout(() => {
    document.querySelector('#arrow_left').style.display = 'none';
    document.querySelector('#arrow_right').style.display = 'none';
    document.querySelector('#links').style.display = 'none';
  }, 3000);
};

// initiate canvases
const cloudCanvas = document.querySelector('#clouds');
  cloudCanvas.width = canvasWidth;
  cloudCanvas.height = canvasHeight;
const cloudContext = cloudCanvas.getContext('2d');
cloudInit(clouds, cloudCount, canvasWidth, canvasHeight, minCloudHeight, maxCloudHeight, maxXVelocity, maxYVelocity, cloudContext, fps);

const starCanvas = document.querySelector('#stars');
  starCanvas.width = canvasWidth;
  starCanvas.height = canvasHeight;
const starContext = starCanvas.getContext('2d');
starInit(stars, canvasWidth, canvasHeight, maxRadius, starCount, starContext, fps);

const analyserCanvas = document.querySelector('#analyser');
  analyserCanvas.width = canvasWidth;
  analyserCanvas.height = canvasHeight;
const analyserContext = analyserCanvas.getContext('2d');
analyserInit(analyserContext, canvasWidth, canvasHeight, fps);

// skipping tracks
window.resetAnalyser = () => {
  removeNode(document.querySelector('audio'));
  removeNode(document.querySelector('.back'));
  removeNode(document.querySelector('.front'));
  removeNode(document.querySelector('#info p'));
  removeNode(document.querySelector('#info p'));
  removeNode(document.querySelector('#info'));
  clearInterval(analyserAnimation);
  clearInterval(albumArtAnimation);
  audioContext.close();
  analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
  analyserInit(analyserContext, canvasWidth, canvasHeight, fps);
};
document.querySelector('#arrow_right').onclick = () => {
  if (skippingEnabled) {
    window.skippingEnabled = false;
    window.starVelocity = 10;
    window.trackID = trackID === 4 ? 0 : trackID + 1;
    resetAnalyser();
  }
};
document.querySelector('#arrow_left').onclick = () => {
  if (skippingEnabled) {
    window.skippingEnabled = false;
    window.starVelocity = -10;
    window.trackID = trackID === 0 ? 4 : trackID - 1;
    resetAnalyser();
  }
};

// keyboard control
document.body.onkeydown = (e) => {
  if(e.keyCode == 37){
    $('#arrow_left').click();
  }
  if(e.keyCode == 39){
    $('#arrow_right').click();
  }
  if(e.keyCode == 32){
    $('#album_art').click();
  }
};
