const  upBtnEl = document.getElementById('up-btn') ;

window.onscroll = scrollFunction;

function scrollFunction() {
  upBtnEl.style.display = document.documentElement.scrollTop > 300 ? 'block' : 'none';
  
}

upBtnEl.addEventListener('click', () => {
  window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
        });
});