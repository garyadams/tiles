var grid = { maxX: 30, maxY: 15 }

var monsters = [];
var bombs = [];

var player = function(name, maxHp, hp, kills, bombs, x, y) {
  this.name = name,
  this.maxHp = maxHp,
  this.hp = hp,
  this.kills = kills,
  this.bombs = bombs,
  this.x = x,
  this.y = y
};

var monster = function(name, maxHp, hp, x, y) {
  this.name = name,
  this.maxHp = maxHp,
  this.hp = hp,
  this.x = x,
  this.y = y
};

var bomb = function(name, maxHp, hp, x, y) {
  this.name = name,
  this.maxHp = maxHp,
  this.hp = hp,
  this.x = x,
  this.y = y
};

var timer1;

//Setup.
$(document).ready(function() {
  StartNewGame();
});

function StartNewGame() {

  //Cleanup.
  clearInterval(timer1);
  monsters = [];
  bombs = [];

  CreateWorld(30,15);

  player1 = new player("Player", 10, 10, 0, 3, 15, 0);

  DrawPlayer();

  //monsters.push(new monster("Troll", 1, 1, 6, 8));
  //monsters.push(new monster("Troll", 1, 1, 17, 13));
  //monsters.push(new monster("Troll", 1, 1, 25, 3));

  //DrawMonsters();

  timer1 = setInterval(function() {

    SpawnRandomMonster();

    //Move all monsters down the map (tower defense maybe).
    for (var i=monsters.length-1; i>=0; i--) {
      monsters[i].y--;

      //Has this monster just hit a bomb?
      for (var j=bombs.length-1; j>=0; j--) {
        if (monsters[i].x == bombs[j].x && monsters[i].y == bombs[j].y) {
          //Destroy the monster and the bomb.
          monsters.splice(i, 1);
          bombs.splice(j, 1);
          player1.kills++;
          player1.bombs++; //Get a bomb back when one explodes.
        }
      }

      //Has this monster just hit the player's base?
      if (monsters[i].y < 0) {
        monsters.splice(i, 1);
        player1.hp--;
      }
    }

    DrawPlayer();
    DrawMonsters();
    DrawBombs();

  }, 1000);

}



//Key bindings.
$(document).keydown(function(e) {
  //Up
  if (e.keyCode == 87) {
    if (player1.y < grid.maxY && $('td[data-x="' + player1.x + '"][data-y="' + (player1.y+1) + '"]').hasClass('rock') == false) {
      player1.y += 1;
      console.log(player1);
    }
  }
  
  //Right
  if(e.keyCode == 68) {
    if (player1.x < grid.maxX && $('td[data-x="' + (player1.x+1) + '"][data-y="' + player1.y + '"]').hasClass('rock') == false) {
      player1.x += 1;
      console.log(player1);
    }
  }

  //Down
  if (e.keyCode == 83) {
    if (player1.y > 0 && $('td[data-x="' + player1.x + '"][data-y="' + (player1.y-1) + '"]').hasClass('rock') == false) {
      player1.y -= 1;
      console.log(player1); 
    }
  }
  
  //Left
  if (e.keyCode == 65) {
    if (player1.x > 0 && $('td[data-x="' + (player1.x-1) + '"][data-y="' + player1.y + '"]').hasClass('rock') == false) {
      player1.x -= 1;
      console.log(player1);
    }
  }

  //Attack
  if (e.keyCode == 32) {
    for (var i=0; i<monsters.length; i++) {
      if ((monsters[i].x >= (player1.x - 1) && monsters[i].x <= (player1.x + 1)) && (monsters[i].y >= (player1.y - 1) && monsters[i].y <= (player1.y + 1))) {
        monsters[i].hp--;
        console.log(monsters[i]);
      }
    }
  }

  //Turret
  if (e.keyCode == 13) {
    //If player has enough bombs, lay one.
    if (player1.bombs > 0) {
      bombs.push(new bomb("Bomb", 1, 1, player1.x, player1.y));
      player1.bombs--;
    }
  }

  DrawPlayer();
  DrawMonsters();
  DrawBombs();

});

$('#spawn-monster').click(function() {
  SpawnRandomMonster();
  $(this).blur();
});

$('#monster-overview').click(function() {
  var monsterOverview = "";

  for (var i=0; i<monsters.length; i++) {
    monsterOverview += "monster #" + i + ": hp: " + monsters[i].hp + " co-ords: " + monsters[i].x + ", " + monsters[i].y + "\n";
  }

  alert(monsterOverview);
  $(this).blur();
});

$('#start-new-game').click(function() {
  StartNewGame();
  $(this).blur();
});





// Methods.
function CreateWorld(x, y) {
  //Clear existing world if there is one.
  $('#world').html("");

  var worldHtml = "<table>";
  
  //For each row
  for (var i=y; i>=0; i--) {
    worldHtml += "<tr>";
    //For each column
    for (var j=0; j<=x; j++) {
      //Basic wall for now, will change when map support added.
      if (j == 999 && i <= 999) {
        worldHtml += "<td class=\"tile rock\" data-x=\"" + j + "\" data-y=\"" + i + "\">" + j + "," + i + "</td>";
      } else {
        worldHtml += "<td class=\"tile\" data-x=\"" + j + "\" data-y=\"" + i + "\">" + j + "," + i + "</td>";
      }
    }
    worldHtml += "</tr>";
  }

  worldHtml += "</table>";

  $('#world').html(worldHtml);
}

function SpawnRandomMonster() {
  var monsterSpawned = false;

  //Only spawn a random monster if there is space.
  if (monsters.length < 100) {

    while(!monsterSpawned) {
      var x = Math.floor(Math.random() * (grid.maxX - 0 + 1)) + 0;
      var y = Math.floor(Math.random() * (grid.maxY - 13 + 1)) + 13;
      if (TileIsEmpty(x, y)) {
        monsters.push(new monster("Troll", 1, 1, x, y));
        monsterSpawned = true;
      }
    }

    DrawMonsters();
    
  }
}

function TileIsEmpty(x, y) {
  //Innocent until proven guilty.
  isEmpty = true;

  //Check player co-ords.
  if (player1.x == x && player1.y == y) {
    isEmpty = false;
    console.log("collision");
  }

  //Check monster co-ords.
  for (var i=0; i<monsters.length; i++) {
    if (monsters[i].x == x && monsters[i].y == y) {
      isEmpty = false;
      console.log("collision");
    }
  }

  return isEmpty;
}

function DrawPlayer() {
  //Is the game over?
  if(player1.hp <= 0) {
    clearInterval(timer1);
    alert("Game Over");
  }

  //Remove all existing player tiles from the world as they may have moved.
  $('.player').removeClass('player');

  //Update the co-ordinates output.
  $('#current').html(player1.x + ',' + player1.y);

  //Draw the player on the world.
  $('td[data-x="' + player1.x + '"][data-y="' + player1.y + '"]').addClass('player');

  //Update the player hud.
  $('.hud-player').html("<h1>" + player1.name + "</h1><br />" +
                        "<h1>" + player1.hp + " / " + player1.maxHp + "</h1><br />" +
                        "<h1>" + player1.x + "," + player1.y + "</h1><br />" +
                        "<h1>Bombs: " + player1.bombs + "</h1><br />" +
                        "<h1>Kills: " + player1.kills + "</h1>");
}

function DrawMonsters() {
  //Remove all current monsters from the world as they may have moved.
  $('.monster').removeClass('monster');
  $('.hud-monster').html("");

  //Are all our monsters still alive?
  for (var i=monsters.length-1; i>=0; i--) {
    if (monsters[i].hp <= 0) {
      //Remove this monster from the array.
      monsters.splice(i, 1);
      player1.kills++;
      DrawPlayer();
    }
  }

  //For each monster in our monsters array.
  for (var i=0; i<monsters.length; i++) {
    //Draw the monster on the world.
    $('td[data-x="' + monsters[i].x + '"][data-y="' + monsters[i].y + '"]').addClass('monster');

    //If the player is close enough to attack any monsters, show those monster's huds.
    if ((monsters[i].x >= (player1.x - 1) && monsters[i].x <= (player1.x + 1)) && (monsters[i].y >= (player1.y - 1) && monsters[i].y <= (player1.y + 1))) {
      $('.hud-monster').append("<h1>" + monsters[i].name + "</h1><br />"+
                               "<h1>" + monsters[i].hp + " / " + monsters[i].maxHp + "</h1><br />");
    }
  }
}

function DrawBombs() {
  //Remove all current bombs from the world as they may have moved.
  $('.bomb').removeClass('bomb');

  //For each bomb in our bombs array.
  for (var i=0; i<bombs.length; i++) {
    //Draw the bomb on the world.
    $('td[data-x="' + bombs[i].x + '"][data-y="' + bombs[i].y + '"]').addClass('bomb');
  }
}