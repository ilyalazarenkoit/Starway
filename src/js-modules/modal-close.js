const overlay = document.querySelector('.modal__backdrop');
const modalCardMovie = document.querySelector('.modal_movie_card');
const modalclose = document.querySelector('.modal__close-btn');

modalclose.addEventListener('click', onModalCloseBtn);

function onModalCloseBtn() {
  modalCardMovie.innerHTML = '';
  overlay.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onModalCloseBtn();
  }
}

function onPushEsc(event) {
  if (event.code === 'Escape') {
    onModalCloseBtn();
  }
}

export { onBackdropClick, onPushEsc, onModalCloseBtn };
