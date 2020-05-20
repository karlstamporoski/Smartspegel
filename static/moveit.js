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

function moveUntillOutside(dragged, dropped, overlapThreshold, pos) {
	if (Draggable.hitTest(dragged, dropped, overlapThreshold)) {
		TweenMax.to(dragged, 0.00001, pos);
	}
}

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

	pos.onComplete = function() {
		moveUntillOutside(dragged, dropped, overlapThreshold, pos);
	}
	// TODO: change the position from +/- 30px to instead check where
	//       the `dropped` element is positioned and place the `dragged`
	//       element outside of this element (with an additional, perhaps,
	//       +/- 30px like before).
	//	   Or re check if the 'dragged' element is still in collision with the
	//	   element and re run the logic of the kollision function 

	TweenMax.to(dragged, 0.00001, pos);
}