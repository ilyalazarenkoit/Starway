const film_list = document.querySelector('.film__list');

window.addEventListener('load', onLoad);

function onLoad() {}

function renderDefaultMarkup() {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d7175633e0b5107da3a11b631113cb80&query="john"&rating=6`
  )
    .then(response => response.json())
    .then(response => console.log(response));
}

renderDefaultMarkup();

console.log('hello world');

export { film_list, onLoad, renderDefaultMarkup };
