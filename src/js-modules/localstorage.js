import {
  renderMarkup,
  film_list,
  fetchTrendingFilms,
  homePage,
  getGenreByID,
} from './main-page-default';
import { fetchFilmPick, BASE_URl, API_KEY } from './modal-markup';
import { genres } from './genres';
import Notiflix from 'notiflix';
import { divPagination, container } from './pagination';
import Pagination from 'tui-pagination';



const arrWatched = [];
const arrQueue = [];

const library = document.querySelector('.library');
const checkLibrary = document.querySelector('.render__library');
const handleWatchedBackdrop = document.querySelector('.modal__backdrop');
const handleButtonClickWatched = document.querySelector('.library-watched');
const handleButtonClickQueue = document.querySelector('.library-queue');


export function addToLibrary() {
  if (handleWatchedBackdrop) {
    const handleButtonClickAddWatched = document.querySelector('.btn_add');
    const handleButtonClickAddQueue = document.querySelector('.btn_queue');
    const modalCardMovie = document.querySelector('.modal_movie_card');

    handleButtonClickAddWatched.addEventListener('click', event => {
      const id = event.target.dataset.id;
      addWatchedLibrary(id);
    });

    handleButtonClickAddQueue.addEventListener('click', event => {
      const id = event.target.dataset.id;
      addQueueLibrary(id);
    });

    function openLibrary(kay) {
      const dataW = localStorage.getItem(kay);
      return dataW ? JSON.parse(dataW) : [];
    }

    function addWatchedLibrary(id) {
      const arrWatched = openLibrary('arrWatched');
      if (arrWatched.includes(id)) {
        arrWatched.map((el, index, arr) => {
          if (el === id) {
            arrWatched.splice(index, 1);
          }
        });

        localStorage.setItem('arrWatched', JSON.stringify(arrWatched));
        handleButtonClickAddWatched.classList.remove('change-btn');
        handleButtonClickAddWatched.textContent = 'Add to Watched';

        if (
          library.classList.contains('active') &&
          handleButtonClickWatched.classList.contains('enable')
        ) {
          openWatchedLibrary();
          modalCardMovie.innerHTML = '';
          handleWatchedBackdrop.classList.toggle('is-hidden');
        }
        Notiflix.Notify.success('Film remove from watched library');
        return;
      }
      handleButtonClickAddWatched.classList.add('change-btn');
      handleButtonClickAddWatched.textContent = 'Remove from Watched';
      arrWatched.push(id);
      localStorage.setItem('arrWatched', JSON.stringify(arrWatched));
      Notiflix.Notify.success('Film add to watched library');
    }

    function addQueueLibrary(id) {
      const arrQueue = openLibrary('arrQueue');
      if (arrQueue.includes(id)) {
        arrQueue.map((el, index, arr) => {
          if (el === id) {
            arrQueue.splice(index, 1);
          }
        });
        localStorage.setItem('arrQueue', JSON.stringify(arrQueue));
        handleButtonClickAddQueue.classList.remove('change-btn');
        handleButtonClickAddQueue.textContent = 'Add to Queue';

        if (
          library.classList.contains('active') &&
          handleButtonClickQueue.classList.contains('enable')
        ) {
          modalCardMovie.innerHTML = '';
          handleWatchedBackdrop.classList.add('is-hidden');
          openQueueLibrary();
        }

        Notiflix.Notify.success('Film remove from Queue ');
        return;
      }
      handleButtonClickAddQueue.classList.add('change-btn');
      handleButtonClickAddQueue.textContent = 'Remove from Queue';
      arrQueue.push(id);
      localStorage.setItem('arrQueue', JSON.stringify(arrQueue));
      Notiflix.Notify.success('Film add to Queue');
    }
  }
}

function openWatchedLibrary() {
  film_list.innerHTML = '';
  divPagination.classList.add("is-hidden")
  const unparsedWatched = localStorage.getItem('arrWatched');
  const watched = JSON.parse(unparsedWatched);
  if (watched.length > 0) {
    watched.map(async id => {
      const results = await fetchFilmPick(id);
      film_list.innerHTML += await renderLibraryFilms(results);
    });
  } else {
    Notiflix.Notify.failure('Sorry, films not found');
    film_list.innerHTML = `<li><h2 class="empty-library">No movies in "Watched"</li>`;
  }
}

function openQueueLibrary() {
  film_list.innerHTML = '';
  divPagination.classList.add("is-hidden")
  const unparsedQueue = localStorage.getItem('arrQueue');
  const queue = JSON.parse(unparsedQueue);
  if (queue.length > 0) {
    queue.map(async id => {
      const results = await fetchFilmPick(id);
      film_list.innerHTML += await renderLibraryFilms(results);
    });
  } else {
    Notiflix.Notify.failure('Sorry, films not found');
    film_list.innerHTML = `<li><h2 class="empty-library">No movies in "Queue"</li>`;
  }
}

library.addEventListener('click', () => {
  if (handleButtonClickWatched.classList.contains('enable')) {
    openWatchedLibrary();
  } else {
    openQueueLibrary();
  }
});

handleButtonClickWatched.addEventListener('click', openWatchedLibrary);
handleButtonClickQueue.addEventListener('click', openQueueLibrary);
async function renderLibraryFilms(results) {
  return `<li class="film__card" data-id="${results.id}">
  <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
    results.poster_path
  }" alt=${results.title}>
  <div class="film__wrapper">
  <h2 class="film__name">${results.title}</h2>
  <p class="film__genre">${await getGenre(results.genres)} | ${(
    results.release_date ||
    item.first_air_date ||
    ''
  ).slice(0, 4)}</p>
<p class="film__rate">${results.vote_average.toFixed(1)}</p>
</div>
</li>`;
}

async function getGenre(genres) {
  let processed = await genres.map(item => item.name);
  if (processed.length > 3) {
    processed.splice(2, processed.length - 2, 'Other');
  }
  let str = processed.join(', ');
  return str;
}

