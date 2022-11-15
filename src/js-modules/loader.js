const spinnerEl = document.querySelector('.spinner')

window.addEventListener('load', onLoad);

function onLoad() {
   spinnerEl.classList.add('hide-load');
    setTimeout(() => {
        spinnerEl.remove();
    }, 500);
}