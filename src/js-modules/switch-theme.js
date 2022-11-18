const toggleSwitch = document.querySelector('.toggle-button');

const darkThemeSettings = {
  backgroundColor: 'black',
  color: 'var(--secondary-color-of-text)',
  checked: 'true',
};
const ligthThemeSettings = {
  backgroundColor: 'white',
  color: 'var(--primary-color-of-text)',
  checked: 'false',
};

function changeBodyStyles() {
  document.body.style.cssText = `
        background-color: ${
          JSON.parse(localStorage.getItem('theme')).backgroundColor
        };
        color: ${JSON.parse(localStorage.getItem('theme')).color};
    `;

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
