var grid = { maxX: 30, maxY: 15 }

var monsters = [];

var player = function(hp, x, y) {
  this.hp = hp,
  this.x = x,
  this.y = y
};

var monster = function(hp, x, y) {
  this.hp = hp,
  this.x = x,
  this.y = y
};

//Setup.
$(document).ready(function() {
  CreateWorld(30,15);

  player1 = new player(10, 4, 7);

  UpdatePlayer();

  monsters.push(new monster(10, 17, 13));
  monsters.push(new monster(10, 25, 3));

  UpdateMonsters();
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

  UpdatePlayer();
});

$('#spawn-monster').click(function() {
  var monsterSpawned = false;

  while(!monsterSpawned) {
    var x = Math.floor(Math.random() * (grid.maxX - 0 + 1)) + 0;
    var y = Math.floor(Math.random() * (grid.maxY - 0 + 1)) + 0;
    if (TileIsEmpty(x, y)) {
      monsters.push(new monster(10, x, y));
      monsterSpawned = true;
    }
  }

  UpdateMonsters();
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

function TileIsEmpty(x, y) {

  //Innocent until proven guilty.
  isEmpty = true;

  alert(x + ' ' + y)

  tempMonster = new monster(10, x, y);

  alert($.inArray(tempMonster, monsters));

  return true;

}

function UpdatePlayer() {
  //Remove all existing player tiles from the world as they may have moved.
  $('.player').removeClass('player');

  //Update the co-ordinates output.
  $('#current').html(player1.x + ',' + player1.y);

  //Draw the player on the world.
  $('td[data-x="' + player1.x + '"][data-y="' + player1.y + '"]').addClass('player');
}

function UpdateMonsters() {
  //Remove all current monster from the world as they may have moved.
  $('.monster').removeClass('monster');

  //For each monster in our monsters array, draw the monster on world.
  for (var i=0; i<monsters.length; i++) {
    $('td[data-x="' + monsters[i].x + '"][data-y="' + monsters[i].y + '"]').addClass('monster');
  }
}