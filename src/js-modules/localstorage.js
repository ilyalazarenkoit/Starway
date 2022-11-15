const axios = require('axios');

const BASE_URl = 'https://api.themoviedb.org/3/trending/all/day?api_key=';
const API_KEY = 'd7175633e0b5107da3a11b631113cb80';

const markupPlace = document.querySelector('body');

function getItem() {
  return fetch(`${BASE_URl}${API_KEY}`);
}

getItem()
  .then(response => response.json())
  .then(response => console.log(response.results));

function createMarkup() {
  return `<form>
            <button  class="library-watched" type="button">Watched</button>
            <button class="library-queue" type="button" >queue</button>
          </form>`;
}

markupPlace.innerHTML = createMarkup();

const handleButtonClickWatched = document.querySelector('.library-watched');

const handleButtonClickQueue = document.querySelector('.library-queue');

handleButtonClickWatched.addEventListener('click', openWatchedLibrary);

handleButtonClickQueue.addEventListener('click', openQueueLibrary);

// export async function getData() {
//   const films = await fetch(
//     `${BASE_URl}/3/trending/movie/day?api_key=${API_KEY}`
//   ).then(response => response.json());
//   return films;
// }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// localStorage.setItem('ui-theme', 'light');
// localStorage.setItem('sidebar', 'expanded');
// localStorage.setItem('notification-level', 'mute');

const queue = {
  theme: 'dark',
  isAuthenticated: true,
  options: [1, 2, 3],
};

const watched = {
  theme: 'white',
  isAuthenticated: false,
  options: [4, 5, 6],
};

localStorage.setItem('queue', JSON.stringify(queue));

localStorage.setItem('watched', JSON.stringify(watched));

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function openWatchedLibrary() {
  console.log('Watched');
  console.log('queue');
  const dataQ = localStorage.getItem('queue');

  console.log(dataQ);
}

function openQueueLibrary() {
  console.log('queue');
  const dataQ = localStorage.getItem('queue');

  console.log(dataQ);
}
