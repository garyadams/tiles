var grid = { maxX: 30, maxY: 15 }

var monsters = [];

var player = function(name, maxHp, hp, kills, x, y) {
  this.name = name,
  this.maxHp = maxHp,
  this.hp = hp,
  this.kills = kills,
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

//Setup.
$(document).ready(function() {
  CreateWorld(30,15);

  player1 = new player("Player", 10, 10, 0, 4, 7);

  DrawPlayer();

  monsters.push(new monster("Troll", 4, 4, 6, 8));
  monsters.push(new monster("Troll", 5, 5, 17, 13));
  monsters.push(new monster("Troll", 3, 3, 25, 3));

  DrawMonsters();

  setInterval(function() {
    SpawnRandomMonster();

    //Move all monsters down the map (tower defense maybe).
    /*
    for (var i=0; i<monsters.length; i++) {
      monsters[i].y--;
    }

    DrawMonsters();
    */

  }, 2000);

});





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

  DrawPlayer();
  DrawMonsters();

});

$('#spawn-monster').click(function() {
  SpawnRandomMonster();
});

$('#monster-overview').click(function() {
  var monsterOverview = "";

  for (var i=0; i<monsters.length; i++) {
    monsterOverview += "monster #" + i + ": hp: " + monsters[i].hp + " co-ords: " + monsters[i].x + ", " + monsters[i].y + "\n";
  }

  alert(monsterOverview);
});





// Methods.
function CreateWorld(x, y) {
  var worldHtml = "<table>";
  
  //For each row
  for (var i=y; i>=0; i--) {
    worldHtml += "<tr>";
    //For each column
    for (var j=0; j<=x; j++) {
      //Basic wall for now, will change when map support added.
      if (j == 9 && i <= 9) {
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

  while(!monsterSpawned) {
    var x = Math.floor(Math.random() * (grid.maxX - 0 + 1)) + 0;
    var y = Math.floor(Math.random() * (grid.maxY - 0 + 1)) + 0;
    if (TileIsEmpty(x, y)) {
      monsters.push(new monster("Troll", 1, 1, x, y));
      monsterSpawned = true;
    }
  }

  DrawMonsters();
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
                        "<h1>Kills: " + player1.kills + "</h1>");
}

function DrawMonsters() {
  //Remove all current monster from the world as they may have moved.
  $('.monster').removeClass('monster');
  $('.hud-monster').html("");

  //Are all our monsters still alive?
  for (var i=0; i<monsters.length; i++) {
    if (monsters[i].hp <= 0) {
      //Remove this monster from the array.
      monsters.splice(i, 1);
      player1.kills++;
      DrawPlayer();
    }
  }

  //For each monster in our monsters array, draw the monster on world.
  for (var i=0; i<monsters.length; i++) {
    $('td[data-x="' + monsters[i].x + '"][data-y="' + monsters[i].y + '"]').addClass('monster');
  }

  //If the player is close enough to attack any monsters, show those monster's huds.
  for (var i=0; i<monsters.length; i++) {
    if ((monsters[i].x >= (player1.x - 1) && monsters[i].x <= (player1.x + 1)) && (monsters[i].y >= (player1.y - 1) && monsters[i].y <= (player1.y + 1))) {
      $('.hud-monster').append("<h1>" + monsters[i].name + "</h1><br />"+
                               "<h1>" + monsters[i].hp + " / " + monsters[i].maxHp + "</h1><br />");
    }
  }
}