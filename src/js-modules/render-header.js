const navagationLinkElement = document.querySelectorAll('.navigation__link');
const headerMainElement = document.querySelector('.header');
const renderHomeMarkupElement = document.querySelector('.render__home');
const renderLibraryMarkupElement = document.querySelector('.render__library');

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

    renderHomeMarkupElement.style.display = 'block';
    renderLibraryMarkupElement.style.display = 'none';
    return;
  }

  headerMainElement.classList.remove('header__home');
  headerMainElement.classList.add('header__library');

  renderHomeMarkupElement.style.display = 'none';
  renderLibraryMarkupElement.style.display = 'flex';

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
