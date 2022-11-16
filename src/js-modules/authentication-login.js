import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { renderSignButton } from './is-auth';
import Notiflix from 'notiflix';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBeZaamKRGxw5rr7qDCts7Wa8JNip4Wcj8',
  authDomain: 'goit-auth-project.firebaseapp.com',
  projectId: 'goit-auth-project',
  storageBucket: 'goit-auth-project.appspot.com',
  messagingSenderId: '521546490542',
  appId: '1:521546490542:web:a335afe8a18894e48fc33f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authModalWindowElement = document.querySelector('.auth');
const loginFormElement = document.querySelector('.js-login');
const loginNameElement = document.querySelector('.js-login-name');
const loginEmailElement = document.querySelector('.js-login-email');
const loginPasswordElement = document.querySelector('.js-login-password');
const loginErrorElement = document.querySelector('.js-login-error');

const handleCloseAuthModalWindow = () => {
  authModalWindowElement.style.visibility = 'hidden';
  authModalWindowElement.style.opacity = 0;
};

const handleRegistrationNewUser = event => {
  event.preventDefault();
  createUserWithEmailAndPassword(
    auth,
    loginEmailElement.value,
    loginPasswordElement.value
  )
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      loginErrorElement.style.visibility = 'hidden';
      loginEmailElement.style.borderColor = 'gray';

      localStorage.setItem('isAuth', true);

      handleCloseAuthModalWindow();
      renderSignButton();

      Notiflix.Notify.success(
        `Hello, ${loginNameElement.value}! This is your personal account!`
      );
      loginFormElement.reset();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.failure(errorMessage);
      loginErrorElement.style.visibility = 'visible';
      loginEmailElement.style.borderColor = 'red';
      // ..
    });
};

loginFormElement.addEventListener('submit', handleRegistrationNewUser);
