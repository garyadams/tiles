var grid = {
  minX: 0,
  minY: 0,
  maxX: 8,
  maxY: 8
}

var coords = {
	x: 4,
	y: 7
};

//Starting location.
$(document).ready(function() {
  $('#current').html(coords.x + ',' + coords.y);
  $('td[data-x="' + coords.x + '"][data-y="' + coords.y + '"]').css('background','#999');
});

$(document).keydown(function(e) {

  //Up
  if (e.keyCode == 87) {
    if (coords.y < grid.maxY) {
      coords.y += 1;
      console.log(coords);
    }
  }
  
  //Right
  if(e.keyCode == 68) {
    if (coords.x < grid.maxX) {
      coords.x += 1;
      console.log(coords);
    }
  }

  //Down
  if (e.keyCode == 83) {
    if (coords.y > grid.minY) {
      coords.y -= 1;
      console.log(coords); 
    }
  }
  
  //Left
  if (e.keyCode == 65) {
    if (coords.x > grid.minX) {
      coords.x -= 1;
      console.log(coords);
    }
  }

  $('#current').html(coords.x + ',' + coords.y);

  //Reset all tiles.
  $('td').css('background','#333');
  //Update the table with our hero's new coords.
  $('td[data-x="' + coords.x + '"][data-y="' + coords.y + '"]').css('background','#999');

});