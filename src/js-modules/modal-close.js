import './main-page-default';
import { fetchFilmPick, createMarkupMovieInfo } from './modal-markup';

const overlay = document.querySelector('.modal__backdrop');
const modalCardMovie = document.querySelector('.modal_movie_card');
const modalClose = document.querySelector('.modal__close-btn');
const pickFilm = document.querySelector('.film__list');

pickFilm.addEventListener('click', onModalOpenBtn);
modalClose.addEventListener('click', onModalCloseBtn);
overlay.addEventListener('click', onBackdropClick);

function onModalOpenBtn() {
  overlay.classList.toggle('is-hidden');
  window.addEventListener('keydown', onPushEsc);
  document.body.classList.add('modal-block');
}

pickFilm.addEventListener('click', async event => {
  const id = event.target.closest('.film__card').dataset.id;
  const response = await fetchFilmPick(id);
  createMarkupMovieInfo(response);
});

function onModalCloseBtn() {
  modalCardMovie.innerHTML = '';
  overlay.classList.add('is-hidden');
  window.removeEventListener('keydown', onPushEsc);
  document.body.classList.remove('modal-block');
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
