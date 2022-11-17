import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { renderMarkup } from './main-page-default';
import Films__API from './api';

const filmList = document.querySelector('.film__list');
const apiFilms = new Films__API();
const container = document.getElementById('pagination');
formSubmitted = true;

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

// pagination.on('beforeMove', event => {
//   apiFilms.page = event.page;
//   if (apiFilms.searchType === 'byName') {
//     fetchFilms();
//   } else {
//   }
//   apiFilms
//     .getPopularMovies()
//     .then(data => {
//       // console.log(data, renderMarkup)
//       renderMarkup(data.results);
//       filmList.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//       });
//       //   if (formSubmitted) {
//       //     pagination.reset(apiFilms.results);
//       //   }
//       //   formSubmitted = false;
//     })
//     .catch(console.log);
// });

// pagination.on('afterMove', function (eventData) {
//   apiFilms.page = eventData.page;
//   if (apiFilms.searchType === 'byName') {
//     fetchFilms();
//     renderMarkup(data.results);
//   } else {
//     apiFilms.getPopularMovies();
//   }
//   filmList.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// });

pagination.on('beforeMove', event => {
  apiFilms.page = event.page;
  apiFilms
    .getPopularMovies()
    .then(data => {
      // console.log(data, renderMarkup)
      renderMarkup(data.results);
      filmList.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      //   if (formSubmitted) {
      //     pagination.reset(apiFilms.results);
      //   }
      //   formSubmitted = false;
    })
    .catch(console.log);
});
