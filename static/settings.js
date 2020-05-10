$(document).ready(function(){
    $("button",).click(function(){
      $(".FooterSettings").toggle(500);
    });
  });



const show = document.querySelector(".Show");
const updiv = document.querySelector(".Up");
const downdiv = document.querySelector(".Down");
show.addEventListener('click', () => {

  downdiv.classList.add('Up');
  downdiv.classList.remove('Down');
});

show.addEventListener('click', ()=> {
    
    updiv.classList.add('Down');
    updiv.classList.remove('Up');
})