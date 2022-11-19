import { renderMarkup, film_list, fetchTrendingFilms, homePage, getGenreByID } from "./main-page-default";
import { fetchFilmPick, BASE_URl, API_KEY } from "./modal-markup";
import { genres } from './genres';

const arrWatched = [];
const arrQueue = [];
const library = document.querySelector(".library")


const handleWatchedBackdrop = document.querySelector('.modal__backdrop');
const handleButtonClickWatched = document.querySelector('.library-watched');
const handleButtonClickQueue = document.querySelector('.library-queue');


export function addToLibrary() {
  if (handleWatchedBackdrop) {
    const handleButtonClickAddWatched = document.querySelector('.btn_add');
    const handleButtonClickAddQueue = document.querySelector('.btn_queue');

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
        return;
      }
      arrWatched.push(id);
      localStorage.setItem('arrWatched', JSON.stringify(arrWatched));
    }

    function addQueueLibrary(id) {
      const arrQueue = openLibrary('arrQueue');
      if (arrQueue.includes(id)) {
        return;
      }
      arrQueue.push(id);
      localStorage.setItem('arrQueue', JSON.stringify(arrQueue));
    }
  }
}

function openWatchedLibrary() {
    film_list.innerHTML = "";
    const unparsedWatched = localStorage.getItem('arrWatched');
    const watched = JSON.parse(unparsedWatched)
    watched.map(async id => {
      const results = await fetchFilmPick(id);
      renderLibraryFilms(results)
    })
}

function openQueueLibrary() {
    film_list.innerHTML = "";
    const unparsedQueue = localStorage.getItem('arrQueue');
    const queue = JSON.parse(unparsedQueue)
    queue.map(async id => {
      const results = await fetchFilmPick(id);
      renderLibraryFilms(results)
    })
}

library.addEventListener("click", openWatchedLibrary)
handleButtonClickWatched.addEventListener('click', openWatchedLibrary);
handleButtonClickQueue.addEventListener('click', openQueueLibrary);

async function renderLibraryFilms(results) {
  film_list.innerHTML +=  `<li class="film__card" data-id="${results.id}">
  <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
    results.poster_path
  }" alt=${results.title}>
  <div class="film__wrapper">
  <h2 class="film__name">${results.title}</h2>
  <p class="film__genre">${getGenre(results.genres)} | ${(results.release_date || item.first_air_date || '').slice(
0,
4
)}</p>
<p class="film__rate">${results.vote_average.toFixed(1)}</p>
</div>
</li>`
}


async function getGenre(genres) {
 let processed = await genres.map(item => item.name);
  console.log(processed)
  if (processed.length > 3) {
    processed.splice(2, processed.length - 2, 'Other');
  }
  let str = processed.join(', ');
  console.log(str);
  return str;
}