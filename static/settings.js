var IsLocked = false;

/** Toggle to show the menu */
$(document).ready(function(){
    $(".Show",).click(function(){
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
 * Toggles locked/unlocked
 */
const lockdiv = document.querySelector(".LockDrag");
const lockedDiv = document.querySelector(".LockOpen");
const unlockedDiv = document.querySelector(".LockClosed");
lockdiv.addEventListener('click', () => {
  
  $(".LockOpen, .LockClosed").toggleClass("LockOpen LockClosed");
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

const HideDiv = document.querySelector(".HideWidgets");
const hiddenDiv = document.querySelector(".HiddenWidget");
const TimeDateWrapper = document.querySelector(".TimeDateWrapper");
const CalendarWrapper = document.querySelector("CalendarWrapper");
const NewsWrapper = document.querySelector(".NewsWrapper");
const WeatherWrapper = document.querySelector(".WeatherWrapper");
HideDiv.addEventListener('click', () => {

  $(".TimeDateWrapper, .CalendarWrapper, .NewsWrapper, .WeatherWrapper").toggleClass(".HiddenWidget");
})

/**
 * toggles Draggable class from all widgets
 */
const lock = document.querySelector(".LockDrag");
const drag = document.querySelector(".Draggable");
const TimeDateWrapper = document.querySelector(".TimeDateWrapper");
const CalendarWrapper = document.querySelector("CalendarWrapper");
const NewsWrapper = document.querySelector(".NewsWrapper");
const WeatherWrapper = document.querySelector(".WeatherWrapper");
lock.addEventListener('click', () => {
    

    var draggables = $(".TimeDateWrapper, .CalendarWrapper, .NewsWrapper, .WeatherWrapper");
    draggables.toggleClass("Draggable");
    draggables.each(function(index, draggable){
      if (IsLocked){
        Draggable.get(draggable).enable();
      }
      else{
        Draggable.get(draggable).disable();
      }
    })
    if (IsLocked){
      IsLocked = false;
    }
    else{
      IsLocked = true;
    }
})

