var game = document.getElementById('game');
var ship = document.getElementById('ship');
var pw = game.offsetWidth;
var ph = game.offsetHeight;
var sw = ship.offsetWidth;
var sh = ship.offsetHeight;
var capture = false;

function onResize(e) {
  var x = parseInt(ship.style.left);
  var y = parseInt(ship.style.top);
  console.log(y);
  pw = game.offsetWidth;
  ph = game.offsetHeight;
  if (ph < y + sh) {
    var ny = (ph - sh);
    if (ny < 0) { ny = 0; }
    ship.style.top = ny + 'px';
  }
  if (x > pw - sw) {
    var nw = pw - sw
    if (nw < 0) { nw = 0; }
    ship.style.left = nw + 'px';
  }
}

function initGame() {
  console.log("game size : ", pw, ph);
  console.log("ship size : ", sw, sh);
  ship.style.left = (pw/2 - sw/2) + 'px';
  ship.style.top = (ph - sh - 30) + 'px';
}

// 키입력 움직임
function moveKey(e) {
  console.log(e.keyCode);
  var x = parseInt(ship.style.left);
  var y = parseInt(ship.style.top);
  var speed = 20;
  switch(e.keyCode) {
    case 37:
    case 65:
      x -= speed;
      break;
    case 39: 
    case 68: 
      x += speed; 
      break;
    case 87:
    case 38:
      y -= speed;
      break;
    case 83:
    case 40:
      y += speed;
      break;
  }
  if (0 < x && x < pw - sw) {
    ship.style.left = x + 'px';
  }
  if (0 < y && y < ph - sh) {
    ship.style.top = y + 'px';    
  }
}

// 마우스 움직임
function moveMouseDown(e) {
  console.log('moveMouseDown');
  capture = true;
  e.preventDefault();
}

function moveMouseUp(e) {
  console.log('moveMouseUp');
  capture = false;
}

function moveMouse(e) {
  var gl = game.offsetLeft;
  var gt = game.offsetTop;
  var mx = e.clientX - gl;
  var my = e.clientY - gt;
  var nl = parseInt(ship.style.left);
  var nt = parseInt(ship.style.top);
  if (capture) {
    var nx = (mx - sw/2);
    if (nx < 0) { nx = 0; }
    if (nl + sw > pw) { nx = pw - sw; }
    var ny = (my - sh/2);
    if (ny < 0) { ny = 0; }
    if (nt + sh > ph) { ny = ph - sh; }
    ship.style.left = nx  + 'px';
    ship.style.top = ny + 'px';
  }
}



initGame();
document.onkeydown = moveKey;
ship.onmousedown = moveMouseDown;
document.onmouseup = moveMouseUp;
game.onmousemove = moveMouse;

