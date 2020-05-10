
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
 * toggles Draggable class from all widgets
 */
const lock = document.querySelector(".LockDrag");
const drag = document.querySelector(".Draggable");
const TimeDateWrapper = document.querySelector(".TimeDateWrapper");
const CalendarWrapper = document.querySelector("CalendarWrapper");
const NewsWrapper = document.querySelector(".NewsWrapper");
const WeatherWrapper = document.querySelector(".WeatherWrapper");
lock.addEventListener('click', () => {
    
    $(".TimeDateWrapper, .CalendarWrapper, .NewsWrapper, .WeatherWrapper").toggleClass("Draggable")
})

