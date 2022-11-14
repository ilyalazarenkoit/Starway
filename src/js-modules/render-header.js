const navagationLinkElement = document.querySelectorAll('.navigation__link');
const headerMainElement = document.querySelector('.header');
const headerRenderToElement = document.querySelector('.header__render');

const changeEnableButton = () => {
  const renderButtonElement = document.querySelectorAll('.header__button');
  renderButtonElement.forEach(elem => {
    elem.addEventListener('click', () => {
      renderButtonElement.forEach(el => {
        el.classList.remove('enable');
      });

      elem.classList.add('enable');
    });
  });
};

const renderHeaderMarkup = () => {
  const activeElement = document.querySelector('.active');

  if (activeElement.textContent === 'Home') {
    headerMainElement.classList.remove('header__library');
    headerMainElement.classList.add('header__home');

    headerRenderToElement.innerHTML = `
    <form class="header__form search">
      <input type="text" placeholder="Movie search" class="search__input">
      <button type="submit" class="search__submit">
        <svg width="12" height="12">
            <use href="/symbol-defs.a8b2e413.svg#search-icon"></use>
        </svg>
      </button>
    </form>
    <p class="search__error">Search result not successful. Enter the correct movie name and </p>
    `;
    return;
  }

  headerMainElement.classList.remove('header__home');
  headerMainElement.classList.add('header__library');

  headerRenderToElement.innerHTML = `
  <div class="header__render-button">
    <button class="header__button enable">Watched</button>
    <button class="header__button">queue</button>
  </div>
  `;

  changeEnableButton();
};

navagationLinkElement.forEach(elem => {
  elem.addEventListener('click', () => {
    navagationLinkElement.forEach(el => {
      el.classList.remove('active');
    });

    elem.classList.add('active');
    renderHeaderMarkup();
  });
});
