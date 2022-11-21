import Pagination from 'tui-pagination';
import { renderMarkup } from './main-page-default';
import Films__API from './api';

export const apiFilms = new Films__API();
export const container = document.getElementById('pagination');
const filmList = document.querySelector('.film__list');

let formSubmitted = true;
export let divPagination = document.querySelector(".tui-pagination")
const home = document.querySelector(".home")
const logo = document.querySelector('.navigation__logo');


const options = {
  totalItems: 1000,
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

// const pagination = new Pagination(container, options);

// pagination.on('beforeMove', event => {
//   apiFilms.page = event.page;
//   console.log('event', event);
//   const methodApi = apiFilms.query ? 'getFilmsByQuery' : 'getPopularMovies';
//   apiFilms[methodApi]()
//     .then(data => {
//       renderMarkup(data.results);
//       filmList.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//       });
//     })
//     .catch(console.log);
// });

const pagination = new Pagination(container, options);

function enablePagination() {
if(divPagination.classList.contains("is-hidden")){
  divPagination.classList.remove("is-hidden")
}
pagination.on('beforeMove', event => {
  apiFilms.page = event.page;
  console.log('event', event);
  const methodApi = apiFilms.query ? 'getFilmsByQuery' : 'getPopularMovies';
  apiFilms[methodApi]()
    .then(data => {
      console.log(data.total_results);
      options.totalItems = data.total_results;
      console.log(options.totalItems);
      renderMarkup(data.results);
      //   apiFilms.setTotalPages(data.total_pages);
      filmList.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    })
    .catch(console.log);
});
}

enablePagination()

home.addEventListener("click", enablePagination)
logo.addEventListener("click", enablePagination)
