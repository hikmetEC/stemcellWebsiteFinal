const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

let current = 0;
let isScrolling = false;

function goToSlide(i){
  if(i < 0) i = 0;
  if(i > totalSlides - 1) i = totalSlides - 1;
  current = i;
  slider.style.transform = `translateY(-${current * 100}vh)`;
}

window.addEventListener("wheel", (e) => {
  if(isScrolling) return;
  isScrolling = true;

  if(e.deltaY > 0) goToSlide(current + 1);
  else goToSlide(current - 1);

  setTimeout(()=> isScrolling=false, 900);
});

window.addEventListener("keydown", (e)=>{
  if(isScrolling) return;

  if(e.key === "ArrowDown"){
    isScrolling = true;
    goToSlide(current + 1);
    setTimeout(()=> isScrolling=false, 900);
  }

  if(e.key === "ArrowUp"){
    isScrolling = true;
    goToSlide(current - 1);
    setTimeout(()=> isScrolling=false, 900);
  }
});

let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  let touchEndY = e.changedTouches[0].clientY;
  let diff = touchStartY - touchEndY;

  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide(current + 1);
    else goToSlide(current - 1);
  }
});

/* EmailJS */
(function(){
  emailjs.init("hDLRnHJZDpsGogQGi");
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm(
    "service_omobvms",
    "template_r9gehjl",
    this
  ).then(
    function(){
      const form = document.getElementById("contact-form");
      form.reset();

      const msg = document.getElementById("success-message");
      msg.style.display = "block";
      setTimeout(()=>{ msg.style.display = "none"; }, 4000);
    },
    function(error){
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
      console.error(error);
    }
  );
});
