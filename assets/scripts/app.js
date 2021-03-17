window.addEventListener('load', () => {
  resize();
  document.addEventListener('mousedown', startPainting);
  document.addEventListener('mouseup', stopPainting);
  document.addEventListener('mousemove', sketch);
  window.addEventListener('resize', resize);
  onWidthChange();
});

let strokeStyle = 'black';

let lineWidth = 5;

const canvas = document.querySelector('#canvas');
const colorSelector = document.querySelector('#color-selector');
const saveImage = document.querySelector('#save-image');
const lineWidthSelector = document.querySelector('#line-width-selector');
const lineWidthSpan = document.querySelector('#line-width');

const ctx = canvas.getContext('2d');

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event) {
  paint = true;
  getPosition(event);
}

function stopPainting() {
  paint = false;
}

function sketch(event) {
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = strokeStyle;
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

colorSelector.addEventListener('change', (e) => {
  strokeStyle = e.target.value;
});

saveImage.addEventListener('click', () => {
  var link = document.createElement('a');
  link.download = `drau_${new Date().toISOString()}.png`;
  link.href = document.getElementById('canvas').toDataURL();
  link.click();
});

function onWidthChange(e) {
  lineWidth = e && e.target ? e.target.value : 5;
  lineWidthSpan.textContent = lineWidth;
}

lineWidthSelector.addEventListener('change', onWidthChange);

var clean = document.getElementById('clean');

clean.addEventListener('click', () => {
  canvas.width = canvas.width;
});
