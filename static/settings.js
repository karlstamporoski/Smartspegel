var IsLocked = false;

/** Toggle to show the menu */
$(document).ready(function() {
	$(".Show", ).click(function() {
		$(".SettingsMenu").toggle(500);
	});
});

/**
 * Toggles the arrow to show up or down
 * for the menu
 */
const show = document.querySelector(".Show");
const updiv = document.querySelector(".Up");
const downdiv = document.querySelector(".Down");
show.addEventListener('click', () => {

	$(".Up, .Down").toggleClass("Up Down");
});

/**
 * Toggles Show/hide
 */
const HideDiv = document.querySelector(".HideWidgets");
const OpenEyeDiv = document.querySelector(".OpenEye");
const ClosedEyeDiv = document.querySelector(".ClosedEye");
HideDiv.addEventListener('click', () => {

	$(".OpenEye, .ClosedEye").toggleClass("OpenEye ClosedEye");
});

const Hide = document.querySelector(".HideWidgets");
const Hidden = document.querySelector(".HiddenWidget");
const TimeDateDiv = document.querySelector(".TimeDateWrapper");
const CalendarDiv = document.querySelector(".CalendarWrapper");
const NewsDiv = document.querySelector(".NewsWrapper");
const WeatherDiv = document.querySelector(".WeatherWrapper");
Hide.addEventListener('click', () => {

	$(".TimeDateWrapper, .CalendarWrapper, .NewsWrapper, .WeatherWrapper").toggleClass("HiddenWidget");
});

/**
 * Switches image from locked/unlocked
 * toggles Draggable class from all widgets
 */

const lockdiv = document.querySelector(".LockDrag");
const lockedDiv = document.querySelector(".LockOpen");
const unlockedDiv = document.querySelector(".LockClosed");
lockdiv.addEventListener('click', () => {

	$(".LockOpen, .LockClosed").toggleClass("LockOpen LockClosed");
});

const lock = document.querySelector(".LockDrag");
const drag = document.querySelector(".Draggable");
const TimeDateWrapper = document.querySelector(".TimeDateWrapper");
const CalendarWrapper = document.querySelector(".CalendarWrapper");
const NewsWrapper = document.querySelector(".NewsWrapper");
const WeatherWrapper = document.querySelector(".WeatherWrapper");
lock.addEventListener('click', () => {

	var draggables = $(".TimeDateWrapper, .CalendarWrapper, .NewsWrapper, .WeatherWrapper");
	draggables.toggleClass("Draggable");
	draggables.each(function(index, draggable) {
		if (IsLocked) {
			Draggable.get(draggable).enable();
		} else {
			Draggable.get(draggable).disable();
		}
	})
	if (IsLocked) {
		IsLocked = false;
	} else {
		IsLocked = true;
	}
})