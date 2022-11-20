import Films__API from './api';

const filmApi = new Films__API();
const filmModalElement = document.querySelector('.modal__container');
const closeTrailerModal = document.querySelector('.trailer__close');
const trailerModalElement = document.querySelector('.trailer');
let movieID = '';

const handleOpenTrailer = event => {
  if (event.target.classList.contains('btn_trailer')) {
    const filmTitle = document.querySelector('.modal_info__title').textContent;

    document.body.style.overflowY = 'hidden';

    trailerModalElement.style.cssText = `
        opacity: 1;
        visibility: visible;
    `;

    filmApi.setQuery(filmTitle);
    filmApi
      .getFilmsByQuery()
      .then(data => {
        movieID = data.results[0].id;

        fetch(
          `${filmApi.URL}movie/${movieID}/videos?api_key=${filmApi.KEY}&language=en-US`
        )
          .then(response => {
            if (!response.ok) {
              throw new Error(response.status);
            }

            return response.json();
          })
          .then(data => {
            renderYouTubeTrailer(data.results[0].key);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return;
};

const renderYouTubeTrailer = id => {
  document.querySelector('.trailer__video').innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    `;
};

const handleCloseTrailerModal = () => {
  document.body.style.overflowY = 'visible';
  document.querySelector('.trailer__video').innerHTML = '';

  trailerModalElement.style.cssText = `
    opacity: 0;
    visibility: hidden;
    `;
};

filmModalElement.addEventListener('click', handleOpenTrailer);
closeTrailerModal.addEventListener('click', handleCloseTrailerModal);
