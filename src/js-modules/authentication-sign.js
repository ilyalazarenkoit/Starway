import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
const signFormElement = document.querySelector('.js-sign');
const signEmailElement = document.querySelector('.js-sign-email');
const signPasswordElement = document.querySelector('.js-sign-password');
const signErrorElement = document.querySelector('.js-sign-error');

renderSignButton();

const handleCloseAuthModalWindow = () => {
  authModalWindowElement.style.visibility = 'hidden';
  authModalWindowElement.style.opacity = 0;
};

const handleSignInUser = event => {
  event.preventDefault();
  signInWithEmailAndPassword(
    auth,
    signEmailElement.value,
    signPasswordElement.value
  )
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      signErrorElement.style.visibility = 'hidden';
      localStorage.setItem('isAuth', true);

      handleCloseAuthModalWindow();
      renderSignButton();

      Notiflix.Notify.success('Congratulations! Login successful!');
      signFormElement.reset();
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      Notiflix.Notify.failure(errorMessage);
      signErrorElement.style.visibility = 'visible';
    });
};

signFormElement.addEventListener('submit', handleSignInUser);
