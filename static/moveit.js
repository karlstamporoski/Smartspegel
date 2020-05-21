var droppables = $(".Draggable");
var posCalc = $(".Draggable");
var overlapThreshold = "0%";
var lastDragged;

// Create Draggables with the hitTest()
Draggable.create(droppables, {
  bounds: container,
	onDragStart: function(e) {
		$(this.target).addClass("highlight");
	},
	onDrag: function(e) {
		// Set variable value for later use in test()
		lastDragged = this.target;
		//Do the "real work" of this function!
		var i = droppables.length;
		while (--i > -1) {
			if (this.hitTest(droppables[i], overlapThreshold)) {
				$(droppables[i]).addClass("highlight");
			} else {
				$(droppables[i]).removeClass("highlight");
			}
		}
	},
	onDragEnd: function(e) {
		var i = droppables.length;
		$(this.target).removeClass("highlight");
		while (--i > -1) {
			if (this.hitTest(droppables[i], overlapThreshold)) {
                          moveOtherDraggable(this.target, droppables[i], event);
			}
		}
	}
});

/**
 * Adds a animation to the kollided block when moved
 * @param {*} dragged 
 * @param {*} dropped 
 * @param {*} overlapThreshold 
 * @param {*} pos 
 */
function moveUntillOutside(dragged, dropped, overlapThreshold, pos){
  if (Draggable.hitTest(dragged, dropped, overlapThreshold)){
    TweenMax.to(dragged, 0.01, pos);
  }
}

/**
 * Logic for the collided element
 * @param {*} dragged 
 * @param {*} dropped 
 * @param {*} event 
 */
function moveOtherDraggable(dragged, dropped, event) {
  var w = $(dropped).width();
  var h = $(dropped).height();
  var offset = $(dropped).offset();

  var x = (event.pageX - offset.left - (w / 2)) * (w > h ? (h / w) : 1);
  var y = (event.pageY - offset.top - (h / 2)) * (h > w ? (w / h) : 1);
  var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

  let pos = {
   

  };

  switch (direction) {
    // Top
    case 0:
      pos.top = "-=20px";
      break;
    // Right
    case 1:
      pos.left = "+=20px";
      break;
    // Bottom
    case 2:
      pos.top = "+=20px";
      break;
    // Left
    case 3:
      pos.left = "-=20px";
      break;
  }

  /**
   * Checks if element is still coliding
   * Loops logic
   */
pos.onComplete = function(){
  moveUntillOutside(dragged, dropped, overlapThreshold, pos);
}

  TweenMax.to(dragged, 0.01, pos);
}
