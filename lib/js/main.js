var grid = { maxX: 30, maxY: 15 }

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

  SpawnPlayer(player1);

  monster1 = new monster(10, 17, 13);
  monster2 = new monster(10, 25, 3);

  SpawnMonster(monster1);
  SpawnMonster(monster2);
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

  $('#current').html(player1.x + ',' + player1.y);

  //Reset previous player tile.
  $('td.player').removeClass('player');
  //Update the table with our hero's new player1.
  $('td[data-x="' + player1.x + '"][data-y="' + player1.y + '"]').addClass('player');
});

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

function SpawnPlayer(player) {
  $('#current').html(player.x + ',' + player.y);
  $('td[data-x="' + player.x + '"][data-y="' + player.y + '"]').addClass('player');
}

function SpawnMonster(monster) {
  $('td[data-x="' + monster.x + '"][data-y="' + monster.y + '"]').addClass('monster');
}