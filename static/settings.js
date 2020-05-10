$(document).ready(function(){
    $("button",).click(function(){
      $(".SettingsMenu").toggle(500);
    });
  });



const show = document.querySelector(".Show");
const updiv = document.querySelector(".Up");
const downdiv = document.querySelector(".Down");
show.addEventListener('click', () => {

  $(".Up, .Down").toggleClass("Up Down");
});