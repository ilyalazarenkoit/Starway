import { genres } from './genres';
import { showGallery } from './search_film';
// import { startPagination } from './pagination';

let processed;
export let film_list = document.querySelector('.film__list');
let markup = '';
export let page = 1;
export let insertPage = `&page=${page}`;
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=';
const API_KEY = 'd7175633e0b5107da3a11b631113cb80';
const LANGUAGE = '&language=en-US';
export const homePage = document.querySelector('.home');
const logo = document.querySelector('.navigation__logo');

window.addEventListener('load', fetchTrendingFilms);
homePage.addEventListener('click', fetchTrendingFilms);
logo.addEventListener('click', fetchTrendingFilms);

export function getGenreByID(array, ids = []) {
  processed = ids.map(id => {
    return array.find(item => item.id === id)?.name});
  if (processed.length > 3) {
    processed.splice(2, processed.length - 2, 'Other');
  }
  if(processed) {
  let str = processed.join(' ');
  return str
  }
  return str;
}

export function renderMarkup(results) {
  markup = results
    .map(item => {
      if(item.vote_average && item.poster_path) {
      return `<li class="film__card" data-id="${item.id}" name="card">
              <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
                (item.poster_path)
              }" alt=${(item.title || item.name)}>
              <div class="film__wrapper">
              <h2 class="film__name">${(item.title || item.name)}</h2>
              <p class="film__genre">${getGenreByID(
                genres,
                item.genre_ids
              )} | ${(item.release_date || item.first_air_date || '').slice(
        0,
        4
      )}</p>
        <p class="film__rate">${(item.vote_average.toFixed(1))}</p>
        </div>
        </li>`;
    }else if(item.vote_average === undefined && item.poster_path !== undefined){ 
      return `<li class="film__card" data-id="${item.id}" name="card">
      <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
        (item.poster_path)
      }" alt=${(item.title || item.name)}>
      <div class="film__wrapper">
      <h2 class="film__name">${(item.title || item.name)}</h2>
      <p class="film__genre">${getGenreByID(
        genres,
        item.genre_ids
      )} | ${(item.release_date || item.first_air_date || '').slice(
0,
4
)}</p>
</div>
</li>`;
  }
})
    .join('');
  film_list.innerHTML = markup;
}

export function fetchTrendingFilms() {
  fetch(`${TRENDING_URL}${API_KEY}${LANGUAGE}${insertPage}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      response.results.sort((a, b) => b.vote_average - a.vote_average);
      console.log(response)
      renderMarkup(response.results);
    });
}
