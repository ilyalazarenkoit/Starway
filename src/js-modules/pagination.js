import Pagination from 'tui-pagination';
import { renderMarkup } from './main-page-default';
import Films__API from './api';

const filmList = document.querySelector('.film__list');
export const apiFilms = new Films__API();
const container = document.getElementById('pagination');
let formSubmitted = true;

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export const pagination = new Pagination(container, options);

pagination.on('beforeMove', event => {
  apiFilms.page = event.page;
  // console.log('event', event);
  const methodApi = apiFilms.query ? 'getFilmsByQuery' : 'getPopularMovies';
  apiFilms[methodApi]()
    .then(data => {
      renderMarkup(data.results);
      filmList.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    })
    .catch(console.log);
});
