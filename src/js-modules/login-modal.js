const signInButtonElement = document.querySelector('.navigation__sign-in');
const authModalWindowElement = document.querySelector('.auth');
const closeModalWindowButtonElement = document.querySelector('.auth__close');
const renderLoginMarkupButtonElement = document.querySelector('.sign__login');
const renderSignInMarkupButtonElement = document.querySelector('.login__sign');
const signInMarkupElement = document.querySelector('.sign');
const logInMarkupElement = document.querySelector('.login');

const handleOpenAuthModalWindow = () => {
  authModalWindowElement.style.opacity = 1;
  authModalWindowElement.style.visibility = 'visible';
};

const handleCloseAuthModalWindow = () => {
  authModalWindowElement.style.visibility = 'hidden';
  authModalWindowElement.style.opacity = 0;
};

const handleRenderLoginMarkup = () => {
  signInMarkupElement.style.display = 'none';
  logInMarkupElement.style.display = 'block';
};

const handleRenderSignMarkup = () => {
  logInMarkupElement.style.display = 'none';
  signInMarkupElement.style.display = 'block';
};

signInButtonElement.addEventListener('click', handleOpenAuthModalWindow);
closeModalWindowButtonElement.addEventListener(
  'click',
  handleCloseAuthModalWindow
);
renderLoginMarkupButtonElement.addEventListener(
  'click',
  handleRenderLoginMarkup
);
renderSignInMarkupButtonElement.addEventListener(
  'click',
  handleRenderSignMarkup
);
