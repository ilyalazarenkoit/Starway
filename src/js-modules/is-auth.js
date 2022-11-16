const signInButtonElement = document.querySelector('.navigation__sign-in');
const signOutButtonElement = document.querySelector('.navigation__sign-out');

export const renderSignButton = () => {
  if (localStorage.getItem('isAuth') === 'true') {
    signInButtonElement.style.display = 'none';
    signOutButtonElement.style.display = 'block';
  } else if (localStorage.getItem('isAuth') === 'false') {
    signInButtonElement.style.display = 'block';
    signOutButtonElement.style.display = 'none';
  }
};

const handleSignOutUser = () => {
  localStorage.setItem('isAuth', false);
  renderSignButton();
};

signOutButtonElement.addEventListener('click', handleSignOutUser);
