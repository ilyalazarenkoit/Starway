import axios from 'axios';

export default class Films__API {
  constructor() {
    this.KEY = '7a92417a5af1e8667d171d8c5ef3af4e';
    this.URL = 'https://api.themoviedb.org/3/';
    this.query = '';
    this.page = 1;
  }

  getPopularMovies() {
    return axios(
      `${this.URL}/discover/movie?sort_by=popularity.desc&api_key=${this.KEY}&page=${this.page}&language=en-US&include_adult=false`
    ).then(({ data }) => data);
  }

  getFilmsByQuery() {
    return axios
      .get(
        `${this.URL}/search/multi?api_key=${this.KEY}&query=${this.query}&page=${this.page}`
      )
      .then(response => {
        console.log(response.data)
        return response.data;
      });
    }

  getGenre() {
    return axios
      .get(`${this.URL}/genre/movie/list?api_key=${this.KEY}`)
      .then(response => response.genres);
  }


  setQuery(query) {
    this.query = query;
  }
}