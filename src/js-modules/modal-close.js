import './main-page-default';

const overlay = document.querySelector('.modal__backdrop');
const modalCardMovie = document.querySelector('.modal_movie_card');
const modalClose = document.querySelector('.modal__close-btn');

const pickFilm = document.querySelector('.film__list');
pickFilm.addEventListener('click', onModalOpenBtn);

pickFilm.addEventListener('click', event => {
  const id = event.target.dataset.id;
  fetchFilmPick(id);
});

function onModalOpenBtn() {
  overlay.classList.toggle('is-hidden');
}

modalClose.addEventListener('click', onModalCloseBtn);
overlay.addEventListener('click', onBackdropClick);
window.addEventListener('Escape', onPushEsc);

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
