// const axios = require('axios');

const BASE_URl = 'https:api.themoviedb.org';

const key = 'd7175633e0b5107da3a11b631113cb80';

const createMarkup = document.querySelector('body');
let addFilm = null;

export async function getData() {
  const films = await fetch(`${BASE_URl}/3/movie/76341?api_key=${key}`).then(
    response => response.json()
  );

  return films;
}

const data = getData().then(data => {
  addFilm = data.title;
});
console.log(addFilm);
function markup() {
  return `<div class="films">
  <form><button>1</button>
  <button>2</button>
  </form>
  
  <ul>
        <li> <p class="info-item">
                        <b>Likes</b>${addFilm}
                      </p></li></ul>
</div>`;
}

const roz = markup(addFilm);

createMarkup.innerHTML = roz;
