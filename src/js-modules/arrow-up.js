const  upBtnEl = document.getElementById('up-btn') ;

window.onscroll = scrollFunction;

function scrollFunction() {
  upBtnEl.style.display = document.documentElement.scrollTop > 300 ? 'block' : 'none';
  
}

upBtnEl.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
  
});