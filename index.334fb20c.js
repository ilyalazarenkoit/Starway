!function(){var e,n=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}],t=document.querySelector(".film__list"),a="";window.addEventListener("load",(function(){fetch("".concat("https://api.themoviedb.org/3/trending/movie/day?api_key=").concat("d7175633e0b5107da3a11b631113cb80").concat("&language=en-US")).then((function(e){return e.json()})).then((function(i){i.results.sort((function(e,n){return n.vote_average-e.vote_average})),function(i){a=i.results.map((function(t){return'<li class="film__card">\n            <a class="film__link" href=""></a>\n            <img class="film__img" src="https://image.tmdb.org/t/p/w500/'.concat(t.poster_path,'" alt=').concat(t.title,'>\n            <h2 class="film__name">').concat(t.title,'</h2>\n            <p class="film__genre">').concat(function(n,t){e=t.map((function(e){return n.find((function(n){return n.id===e})).name})),e.length>3&&e.splice(2,e.length-2,"Other");return e.join(", ")}(n,t.genre_ids)," | ").concat(t.release_date.slice(0,4),"</p>\n            </li>")})).join(""),t.innerHTML=a}(i)}))}));var i=document.querySelectorAll(".navigation__link"),r=document.querySelector(".header"),c=document.querySelector(".render__home"),o=document.querySelector(".render__library"),d=function(){var e;if("Home"===document.querySelector(".active").textContent)return r.classList.remove("header__library"),r.classList.add("header__home"),c.style.display="block",void(o.style.display="none");r.classList.remove("header__home"),r.classList.add("header__library"),c.style.display="none",o.style.display="flex",(e=document.querySelectorAll(".header__button")).forEach((function(n){n.addEventListener("click",(function(){e.forEach((function(e){e.classList.remove("enable")})),n.classList.add("enable")}))}))};i.forEach((function(e){e.addEventListener("click",(function(){i.forEach((function(e){e.classList.remove("active")})),e.classList.add("active"),d()}))}))}();
//# sourceMappingURL=index.334fb20c.js.map
