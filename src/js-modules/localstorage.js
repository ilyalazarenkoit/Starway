const axios = require('axios');

const arrWatched = [];
const arrQueue = [];

// const BASE_URl = 'https://api.themoviedb.org/3/trending/all/day?api_key=';
const BASE_URl = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'd7175633e0b5107da3a11b631113cb80';

// https://api.themoviedb.org/3/movie/ 505642?api_key=d7175633e0b5107da3a11b631113cb80&language=en-US

const markupPlace = document.querySelector('body');

function getItem(id) {
  return fetch(`${BASE_URl}${id}?language=en-US&api_key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

// function createMarkup() {
//   return `<form>
//             <button  class="add-library-watched"  data-id="505644" type="button">AddWatched</button>
//             <button class="add-library-queue"  data-id="505644" type="button" >AddQueue</button>

//             <button  class="library-watched" type="button">Watched</button>
//             <button class="library-queue" type="button" >queue</button>
//           </form>`;
// }
// markupPlace.innerHTML = createMarkup();

// const handleButtonClickAddWatched = document.querySelector(
//   '.add-library-watched'
// );
// const handleButtonClickAddQueue = document.querySelector('.add-library-queue');

const handleButtonClickWatched = document.querySelector('.library-watched');
const handleButtonClickQueue = document.querySelector('.library-queue');

// handleButtonClickAddWatched.addEventListener('click', event => {
//   const id = event.target.dataset.id;
//   addWatchedLibrary(id);
// });
// handleButtonClickAddQueue.addEventListener('click', event => {
//   const id = event.target.dataset.id;
//   addQueueLibrary(id);
// });

handleButtonClickWatched.addEventListener('click', openWatchedLibrary);
handleButtonClickQueue.addEventListener('click', openQueueLibrary);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function openLibrary(kay) {
  const dataW = localStorage.getItem(kay);
  return dataW ? JSON.parse(dataW) : [];
}

//кнопка
function openWatchedLibrary() {
  const dataW = localStorage.getItem('arrWatched');
  console.log(dataW);
}

function openQueueLibrary() {
  const dataQ = localStorage.getItem('arrQueue');
  console.log(dataQ);
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

function getDataFilms() {
  const arrWatched = openLibrary('arrWatched');
  const promises = [];
  arrWatched.forEach(id => {
    const promise = getItem(id);
    promises.push(promise);
  });
  Promise.all(promises)
    .then(response => console.log(response))
    .catch(err => console.log(error));
}

getDataFilms();
