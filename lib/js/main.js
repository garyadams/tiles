var grid = {
  maxX: 30,
  maxY: 15
}

var coords = {
	x: 4,
	y: 7
};

//Setup.
$(document).ready(function() {
  CreateWorld(30,15);

  //Plot start location (spawn character);
  $('#current').html(coords.x + ',' + coords.y);
  $('td[data-x="' + coords.x + '"][data-y="' + coords.y + '"]').css('background','#999');
});

//Key bindings.
$(document).keydown(function(e) {
  //Up
  if (e.keyCode == 87) {
    if (coords.y < grid.maxY && $('td[data-x="' + coords.x + '"][data-y="' + (coords.y+1) + '"]').hasClass('rock') == false) {
      coords.y += 1;
      console.log(coords);
    }
  }
  
  //Right
  if(e.keyCode == 68) {
    if (coords.x < grid.maxX && $('td[data-x="' + (coords.x+1) + '"][data-y="' + coords.y + '"]').hasClass('rock') == false) {
      coords.x += 1;
      console.log(coords);
    }
  }

  //Down
  if (e.keyCode == 83) {
    if (coords.y > 0 && $('td[data-x="' + coords.x + '"][data-y="' + (coords.y-1) + '"]').hasClass('rock') == false) {
      coords.y -= 1;
      console.log(coords); 
    }
  }
  
  //Left
  if (e.keyCode == 65) {
    if (coords.x > 0 && $('td[data-x="' + (coords.x-1) + '"][data-y="' + coords.y + '"]').hasClass('rock') == false) {
      coords.x -= 1;
      console.log(coords);
    }
  }

  $('#current').html(coords.x + ',' + coords.y);

  //Reset all tiles.
  $('td').css('background','#333');
  $('.rock').css('background','red');
  //Update the table with our hero's new coords.
  $('td[data-x="' + coords.x + '"][data-y="' + coords.y + '"]').css('background','#999');
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