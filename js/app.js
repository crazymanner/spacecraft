var game = document.getElementById('game');
var rockContainer = document.getElementById('rock_container');
var ship = document.getElementById('ship');
var gameWidth = game.offsetWidth;
var gameHeight = game.offsetHeight;
var shipWidth = ship.offsetWidth;
var shipHeight = ship.offsetHeight;
var capture = false;

function onResize(e) {
  var x = parseInt(ship.style.left);
  var y = parseInt(ship.style.top);
  console.log(y);
  gameWidth = game.offsetWidth;
  gameHeight = game.offsetHeight;
  if (gameHeight < y + shipHeight) {
    var ny = (gameHeight - shipHeight);
    if (ny < 0) { ny = 0; }
    ship.style.top = ny + 'px';
  }
  if (x > gameWidth - shipWidth) {
    var nw = gameWidth - shipWidth;
    if (nw < 0) { nw = 0; }
    ship.style.left = nw + 'px';
  }
}

function setShipPos() {
  ship.style.left = (gameWidth/2 - shipWidth/2) + 'px';
  ship.style.top = (gameHeight - shipHeight - 30) + 'px';
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
  if (0 < x && x < gameWidth - shipWidth) {
    ship.style.left = x + 'px';
  }
  if (0 < y && y < gameHeight - shipHeight) {
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
    var nx = (mx - shipWidth/2);
    if (nx < 0) { nx = 0; }
    if (nl + shipWidth > gameWidth) { nx = gameWidth - shipWidth; }
    var ny = (my - shipHeight/2);
    if (ny < 0) { ny = 0; }
    if (nt + shipHeight > gameHeight) { ny = gameHeight - shipHeight; }
    ship.style.left = nx  + 'px';
    ship.style.top = ny + 'px';
  }
}

function setRocks() {
  for (var i = 0; i < 5; i++) {
    var rock = document.createElement('img');
    rock.src = '../img/rock/04.png';
    rock.classList.add('rock');
    rock.style.top = '-200px';
    rock.style.left = Math.floor(Math.random() * gameWidth) + 'px';
    rock.dataset.speed = Math.floor(Math.random() * 30) + 20;
    rockContainer.appendChild(rock);
  }
}

function moveRocks() {
  var rocks = document.getElementsByClassName('rock');
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i]; 
    var top = parseInt(rock.style.top);
    if (rock.style.visibility === "hidden") {
      rock.style.visibility = 'visible';    
    }
    top += parseInt(rock.dataset.speed);
    if (top > gameHeight) {
      top = -200;
      rock.style.visibility = 'hidden';
      rock.style.left = Math.floor(Math.random() * gameWidth) + 'px';      
    }
    rock.style.top = top + 'px';
  }
}

// main process
setShipPos();
setRocks();

setInterval(moveRocks, 100);

// event
document.onkeydown = moveKey;
ship.onmousedown = moveMouseDown;
document.onmouseup = moveMouseUp;
game.onmousemove = moveMouse;

