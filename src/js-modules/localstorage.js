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

// const handleButtonClickAddWatched = document.querySelector('.btn_add' );            // Кнопки Артура
//
//
// const handleButtonClickAddQueue = document.querySelector('btn_queue'); //btn_queue // Кнопки Артура

const handleButtonClickWatched = document.querySelector('.library-watched'); //  Кнопки На хедері
const handleButtonClickQueue = document.querySelector('.library-queue'); //  Кнопки На хедері

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

function openLibrary(kay) {
  const dataW = localStorage.getItem(kay);
  return dataW ? JSON.parse(dataW) : [];
}

//кнопка Watchad
function openWatchedLibrary() {
  const dataW = localStorage.getItem('arrWatched');
  console.log(dataW);
}

//кнопка Queue
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
arrQueue;
