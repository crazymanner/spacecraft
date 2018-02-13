var game = document.getElementById('game');
var rockContainer = document.getElementById('rock_container');
var ship = document.getElementById('ship');
var debug = document.getElementById('debug');
var gameWidth = game.offsetWidth;
var gameHeight = game.offsetHeight;
var shipWidth = ship.offsetWidth;
var shipHeight = ship.offsetHeight;
var capture = false;
var gametime = document.getElementById('gametime');
var gameTick = 0;

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
  ship.style.width = gameWidth/7 + 'px';
  ship.style.left = (gameWidth/2 - shipWidth/2) + 'px';
  ship.style.top = (gameHeight - shipHeight - 30) + 'px';
}

// 키입력 움직임
function moveKey(e) {
  console.log(e.keyCode);
  var x = parseInt(ship.style.left);
  var y = parseInt(ship.style.top);
  var speed = 40;
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
function moveStart(e) {
  debug.innerHTML = 'touchStart';
  capture = true;
  e.preventDefault();
}

function moveEnd(e) {
  debug.innerHTML = 'touchEnd';
  capture = false;
}

function moveShip(e) {
  var gameLeft = game.offsetLeft;
  var gameTop = game.offsetTop;
  var posX = e.clientX || e.targetTouches[0].pageX;
  var posY = e.clientY || e.targetTouches[0].pageY;
  posX -= gameLeft;
  posY -= gameTop;
  var nowX = parseInt(ship.style.left);
  var nowY = parseInt(ship.style.top);
  if (capture) {
    var newX = (posX - shipWidth/2);
    if (newX < 0) { newX = 0; }
    if (nowX + shipWidth > gameWidth) { newX = gameWidth - shipWidth; }
    var newY = (posY - shipHeight/2);
    if (newY < 0) { newY = 0; }
    if (nowY + shipHeight > gameHeight) { newY = gameHeight - shipHeight; }
    ship.style.left = newX  + 'px';
    ship.style.top = newY + 'px';
  }
}

function addRock() {
  var rock = document.createElement('img');
  rock.src = '../img/rock/04.png';
  rock.classList.add('rock');
  rock.style.top = '-200px';
  rock.style.left = Math.floor(Math.random() * gameWidth) + 'px';
  rock.style.width = (Math.floor(Math.random() * gameWidth/10) + gameWidth/10) + 'px';
  rock.dataset.speed = Math.floor(Math.random() * 30) + 20;
  rock.dataset.direction = Math.floor(Math.random() * 20) - 10;
  rockContainer.appendChild(rock);
}

function setRocks() {
  addRock();
}

function moveRocks() {
  var rocks = document.getElementsByClassName('rock');
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i]; 
    var top = parseInt(rock.style.top);
    var left = parseInt(rock.style.left);
    if (rock.style.visibility === "hidden") {
      rock.style.visibility = 'visible';
    }
    top += parseInt(rock.dataset.speed);
    left += parseInt(rock.dataset.direction);
    if (top > gameHeight) {
      top = -200;
      rock.style.visibility = 'hidden';
      rock.style.left = Math.floor(Math.random() * gameWidth) + 'px';
      if (left < gameWidth/2) {
        rock.dataset.direction = Math.floor(Math.random() * 10) - 5;
      } else {
        rock.dataset.direction = Math.floor(Math.random() * -10) + 5;
      }
    }
    rock.style.top = top + 'px';
    rock.style.left = left + 'px';
  }
}

function setGameTime() {
  gameTick += 0.1;
  gametime.innerHTML = gameTick.toFixed(1);
}



// main process
setShipPos();
setRocks();

setInterval(moveRocks, 100);
setInterval(setGameTime, 100);
setInterval(addRock, 5000);

// event
document.onkeydown = moveKey;
// move
ship.ontouchstart = moveStart;
document.ontouchmove = moveShip;
game.ontouchend = moveEnd;
ship.onmousedown = moveStart;
game.onmousemove = moveShip;
document.onmouseup = moveEnd;


// 남은 것

// 돌 움직임 - 유도탄

// 충돌처리
// 앤딩
