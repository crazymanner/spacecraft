function initGame() {
  var game = document.getElementById('game');
  var ship = document.getElementById('ship');
  var pw = game.offsetWidth;
  var ph = game.offsetHeight;
  var sw = ship.offsetWidth;
  var sh = ship.offsetHeight;
  console.log("game size : ", pw, ph);
  console.log("ship size : ", sw, sh);
  ship.style.left = (pw/2 - sw/2) + 'px';
  ship.style.top = (ph - sh - 30) + 'px';
}

function moveKey(e) {
  console.log(e.keyCode);
  var ship = document.getElementById('ship');
  var x = parseInt(ship.style.left);
  switch(e.keyCode) {
    case 37: x -= 20; break;
    case 39: x += 20; break;
    case 65: x -= 20; break;
    case 68: x += 20; break;
  }
  ship.style.left = x + 'px';
}

function moveMouse() {
  
}

initGame();
document.onkeydown = moveKey;