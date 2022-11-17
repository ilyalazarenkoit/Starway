import { genres } from './genres';

let processed;
let film_list = document.querySelector('.film__list');
let markup = '';
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=';
const API_KEY = 'd7175633e0b5107da3a11b631113cb80';
const LANGUAGE = '&language=en-US';

window.addEventListener('load', fetchTrendingFilms);

function getGenreByID(array, ids = []) {
  processed = ids.map(id => array.find(item => item.id === id)?.name);
  if (processed.length > 3) {
    processed.splice(2, processed.length - 2, 'Other');
  }
  let str = processed.join(', ');
  return str;
}

export function renderMarkup(results) {
  console.log(results);
  markup = results
    .map(item => {
      console.log(item);
      return `<li class="film__card" data-id="${item.id}">
            <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
              item.poster_path
            }" alt=${item.title}>
            <div class="film__wrapper">
            <h2 class="film__name">${item.title}</h2>
            <p class="film__genre">${getGenreByID(genres, item.genre_ids)} | ${(
        item.release_date ||
        item.first_air_date ||
        ''
      ).slice(0, 4)}</p>
      <p class="film__rate">${item.vote_average.toFixed(1)}</p>
      </div>
      </li>`;
    })
    .join('');
  film_list.innerHTML = markup;
}

function fetchTrendingFilms() {
  fetch(`${TRENDING_URL}${API_KEY}${LANGUAGE}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      response.results.sort((a, b) => b.vote_average - a.vote_average);
      renderMarkup(response.results);
    });
}
