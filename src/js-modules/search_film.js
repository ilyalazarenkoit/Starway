import Films__API from './api';
import Notiflix from 'notiflix';
import { renderMarkup } from './main-page-default';
const filmsApi = new Films__API();

const searchEl = document.querySelector('.header__form');

searchEl.addEventListener('submit', onInputSearch);

export function onInputSearch(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.elements.search.value
    .trim()
    .toLowerCase();
  if (inputValue === '') {
    Notiflix.Notify.info('Please, type movie name');
    return;
  }
  console.log(inputValue);
  filmsApi.setQuery(inputValue);
  filmsApi
    .getFilmsByQuery()
    .then(({ results }) => {
      if (results.length === 0) {
        Notiflix.Notify.failure('Sorry, films not found');
        return;
      }
      return renderMarkup(results);
    })
    .catch(error => {
      console.log(error);
    });
  event.currentTarget.reset();
}
