import Pagination from 'tui-pagination';
import { renderMarkup } from './main-page-default';
import Films__API from './api';

const activeList = document.querySelector('.library');
const homeList = document.querySelector('.home');
const handleButtonClickWatch = document.querySelector('.library-watched');
const handleButtonClickQ = document.querySelector('.library-queue');
const filmList = document.querySelector('.film__list');
export const apiFilms = new Films__API();
const container = document.getElementById('pagination');
let formSubmitted = true;
let totalFilm = 1000;

homeList.addEventListener('click', () => {
  PaginationLen();
});

export function PaginationLen(Len) {
  if (activeList.classList.contains('active')) {
    totalFilm = Len;
  }

  if (homeList.classList.contains('active')) {
    totalFilm = 1000;
  }

  const option = {
    totalItems: totalFilm,
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

  const paginations = new Pagination(container, option);

  paginations.on('beforeMove', event => {
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
  1;
}

const options = {
  totalItems: totalFilm,
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
