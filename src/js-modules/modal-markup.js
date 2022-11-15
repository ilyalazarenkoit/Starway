export function createMarkupMovieInfo(
  {
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    runtime,
    title,
    overview,
    poster_path,
  },
  elem
) {
  const imgUrl = `https://image.tmdb.org/t/p`;
  const genresList = genres.map(genre => genre.name).join(' / ');

  const markup = `
        <div class="modal_poster">
                <img class="modal_poster__img" src="${imgUrl}/w500${poster_path}"
                srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            data-srcset="${imgUrl}/w500${poster_path} 500w,         
            ${imgUrl}/w780${poster_path} 780w,
            ${imgUrl}/original${poster_path} 900w"
            data-sizes="auto"          
                alt="${title}"/>
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
                <button class="modal_btn btn_add" type="button">
                </button>
              
                <button class="modal_btn btn_queue" type="button">
                </button>
            </div>
            
        </div>`;

  elem.insertAdjacentHTML('beforeend', markup);
}
