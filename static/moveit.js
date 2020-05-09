var droppables = $(".Draggable");
var posCalc = $(".Draggable");
var overlapThreshold = "0%";
var lastDragged;

// Create Draggables with the hitTest()
Draggable.create(droppables, {
	bounds: window,
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
				test();
			}
		}
	}
});

// If the dragged element is overlapping another of the "droppables"
// continue to move it unitl it is not!
function test() {
	// Here is where I am trying to calculate the amount to move the
	// recatnagle that is being dragged (var lastDragged).

	// First, I am certain that the math here is incorrect.  I need to
	// know THE LEAST DISTANCE from any edge of the lastDragged to the
	// edge of the rectangle it is overlapping and THEN determine to
	// move UP, DOWN, LEFT or RIGHT that many pixels.

	// Second, I need to figure out how to get that value into the Tween!
	// I have texted --
	// Using the integer variable roundUp_X- NO GO!
	// Using the concatenated string variable move_X -  NO GO!

	// Lastely, I think will need a an If/Else structure or maybe
	// a switch that will lead to a tween for one of the four
	// directions (UP, DOWN, LEFT or RIGHT) as mentioned above.

	var j = posCalc.length;
	while (--j > -1) {
		var rectangles_L = posCalc[j].getBoundingClientRect().left;
		var rectangels_T = posCalc[j].getBoundingClientRect().top;
		var lastDragged_L = lastDragged.getBoundingClientRect().left;
		var lastDragged_T = lastDragged.getBoundingClientRect().top;
		var xDistance = rectangles_L - lastDragged_L;
		var yDistance = rectangels_T - lastDragged_T;
		var roundUp_X = Math.ceil(xDistance);
		var roundUp_Y = Math.ceil(yDistance);
		var move_X = '"' + '+=' + roundUp_X + 'px' + '"';
		var move_Y = "+=" + roundUp_Y + "px";
		console.log("move_X = " + roundUp_X);
		console.log("move_Y = " + roundUp_Y);
	}
	// Here is where the widgets get moved.
	var i = droppables.length;
	while (--i > -1) {
		if (Draggable.hitTest(lastDragged, droppables[i], overlapThreshold)) {
			TweenMax.to(lastDragged, 0.1, {
				left: "-=30px",
				onComplete: recursive
			});
			$(droppables[i]).addClass("highlight");
		} else {
			$(droppables[i]).removeClass("highlight");
		}
	}
}
/**har problem med att få denna att funka
 * Den skall kalkylera positionen en widget går in
 * och putta ut den beroende på case*/
function getDirection(lastDragged) {
	$(droppables).bind("mouseenter", "mouseleave", function(e) {

		/** the width and height of the current div **/
		var w = $(lastDragged).width();
		var h = $(lastDragged).height();

		/** calculate the x and y to get an angle to the center of the div from that x and y. **/
		/** gets the x value relative to the center of the DIV and "normalize" it **/
		var x = (e.pageX - lastDragged.offset().left - (w / 2)) * (w > h ? (h / w) : 1);
		var y = (e.pageY - lastDragged.offset().top - (h / 2)) * (h > w ? (w / h) : 1);

		/** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
		/** first calculate the angle of the point, 
		 add 180 deg to get rid of the negative values
		 divide by 90 to get the quadrant
		 add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
		var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

		/** do your animations here **/
		switch (direction) {
			case 0:
				/** animations from the TOP **/
				top: "-=30px";
				onComplete: recursive
				break;
			case 1:
				/** animations from the RIGHT **/
				left: "+=30px";
				onComplete: recursive
				break;
			case 2:
				/** animations from the BOTTOM **/
				top: "+=30px";
				onComplete: recursive
				break;
			case 3:
				/** animations from the LEFT **/
				left: "-=30px";
				onComplete: recursive
				break;
		}
	});
}

function recursive() {
	var i = droppables.length;
	while (--i > -1) {
		test();
	}
}