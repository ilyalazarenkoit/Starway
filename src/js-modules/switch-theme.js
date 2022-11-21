import { darkThemeSettings } from './theme-settings';
import { ligthThemeSettings } from './theme-settings';

const toggleSwitch = document.querySelector('.toggle-button');
const footerElement = document.querySelector('.footer');
const footerTextElement = document.querySelectorAll('.footer-text');

function getLsValue() {
  return JSON.parse(localStorage.getItem('theme'));
}

function changeBodyStyles() {
  document.body.style.cssText = `
        background-color: ${getLsValue().backgroundColor};
        color: ${getLsValue().color};
    `;

  footerElement.style.cssText = `
        background-color: ${getLsValue().footerBackgroundColor}
  `;

  footerTextElement.forEach(elem => {
    elem.style.cssText = `
        color: ${getLsValue().footerTextColor}
    `;
  });

  if (JSON.parse(localStorage.getItem('theme')).checked === 'true') {
    toggleSwitch.setAttribute('checked', true);
  } else {
    toggleSwitch.removeAttribute('checked');
  }
}

function checkeLocalStorage() {
  if (!localStorage.getItem('theme')) {
    return;
  }

  changeBodyStyles();
}

checkeLocalStorage();

function switchTheme(e) {
  if (e.target.checked) {
    localStorage.setItem('theme', JSON.stringify(darkThemeSettings));
    changeBodyStyles();
  } else {
    localStorage.setItem('theme', JSON.stringify(ligthThemeSettings));
    changeBodyStyles();
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);
