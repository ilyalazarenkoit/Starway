import './main-page-default';

export const BASE_URl = 'https://api.themoviedb.org/3/movie/';
export const API_KEY = 'd7175633e0b5107da3a11b631113cb80';

const insertMarkup = document.querySelector('.modal_movie_card');

export function fetchFilmPick(id) {
  return fetch(`${BASE_URl}${id}?language=en-US&api_key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export function createMarkupMovieInfo({
  vote_average,
  vote_count,
  popularity,
  original_title,
  genres = [],
  runtime,
  title,
  overview,
  poster_path,
  id,
}) {
  const imgUrl = `https://image.tmdb.org/t/p`;
  const genresList = genres.map(genre => genre.name).join(' / ');
  const markup = `<div class="modal_poster">
                <img class="modal_poster__img" src="${imgUrl}/w500${poster_path}" alt="${title}"/>
        </div>
        <div class="modal_info">
            <div class="wrapper_info">
            <h2 class="modal_info__title">${title}</h2>
                <div class="info_data">
                    <ul class="modal_info__list">
                        <li class="modal_info__item">Vote / Votes <span class="modal_info_render__item">${vote_average} / ${vote_count}</span></li>
                        <li class="modal_info__item">Popularity <span class="modal_info_render__item">${popularity}</span></li>
                        <li class="modal_info__item">Original Title <span class="modal_info_render__item">${original_title}</span></li>
                        <li class="modal_info__item">Genre <span class="modal_info_render__item">${genresList}</span></li>
                        <li class="modal_info__item">Duration <span class="modal_info_render__item">${runtime} min</span></li>
                    </ul>
                </div>
            </div>
            <div class="wrapper_about">
            <h3 class="about__title">About</h3>
            <p class="about__description">${overview}</p>
            </div>
            <div class="wrapper_btn">
                <button class="modal_btn btn_add" type="button" data-id="${id}">Add to Watched
                </button>
              
                <button class="modal_btn btn_queue" type="button" data-id="${id}">Add to queue
                </button>

                <button class="modal_btn btn_trailer" type="button" data-id="${id}">Trailer
                </button>
            </div>
            
        </div>`;
  insertMarkup.innerHTML = markup;
}
