import './main-page-default';
import { fetchFilmPick, createMarkupMovieInfo } from './modal-markup';
import { addToLibrary } from './localstorage';

const overlay = document.querySelector('.modal__backdrop');
const modalCardMovie = document.querySelector('.modal_movie_card');
const modalClose = document.querySelector('.modal__close-btn');
const pickFilm = document.querySelector('.film__list');

pickFilm.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'UL'){
  onModalOpenBtn()
}else{
  return
}
return
});
pickFilm.addEventListener('click', async event => {
  if (event.target.nodeName !== 'UL') {
  const id = event.target.closest('.film__card').dataset.id;
  const response = await fetchFilmPick(id);
  createMarkupMovieInfo(response);
  addToLibrary();
  getDataWithLocaleStorage(id);
}
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

function getDataWithLocaleStorage(id) {
  let dataW = [];
  let dataQ = [];
  dataW = localStorage.getItem('arrWatched');
  dataQ = localStorage.getItem('arrQueue');

  const handleButtonWatch = document.querySelector('.btn_add');
  const handleButtonQueue = document.querySelector('.btn_queue');

  if (dataW.includes(id)) {
    handleButtonWatch.classList.add('change-btn');
    handleButtonWatch.textContent = 'Remove from Watched';
  } else {
    handleButtonWatch.textContent = 'Add to Watched';
  }

  if (dataQ.includes(id)) {
    handleButtonQueue.classList.add('change-btn');
    handleButtonQueue.textContent = 'Remove from Queue';
  } else {
    handleButtonQueue.textContent = 'Add to Queue';
  }
}
