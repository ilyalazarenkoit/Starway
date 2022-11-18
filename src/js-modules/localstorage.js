const arrWatched = [];
const arrQueue = [];

const handleWatchedBackdrop = document.querySelector('.modal__backdrop');
const handleButtonClickWatched = document.querySelector('.library-watched');
const handleButtonClickQueue = document.querySelector('.library-queue');

handleButtonClickWatched.addEventListener('click', openWatchedLibrary);
handleButtonClickQueue.addEventListener('click', openQueueLibrary);

export function addToLibrary() {
  if (handleWatchedBackdrop) {
    const handleButtonClickAddWatched = document.querySelector('.btn_add');
    const handleButtonClickAddQueue = document.querySelector('.btn_queue');

    handleButtonClickAddWatched.addEventListener('click', event => {
      const id = event.target.dataset.id;
      addWatchedLibrary(id);
    });

    handleButtonClickAddQueue.addEventListener('click', event => {
      const id = event.target.dataset.id;
      addQueueLibrary(id);
    });

    function openLibrary(kay) {
      const dataW = localStorage.getItem(kay);
      return dataW ? JSON.parse(dataW) : [];
    }

    function addWatchedLibrary(id) {
      const arrWatched = openLibrary('arrWatched');
      if (arrWatched.includes(id)) {
        return;
      }
      arrWatched.push(id);
      localStorage.setItem('arrWatched', JSON.stringify(arrWatched));
    }

    function addQueueLibrary(id) {
      const arrQueue = openLibrary('arrQueue');
      if (arrQueue.includes(id)) {
        return;
      }
      arrQueue.push(id);
      localStorage.setItem('arrQueue', JSON.stringify(arrQueue));
    }
  }
}

function openWatchedLibrary() {
  const dataW = localStorage.getItem('arrWatched');
  console.log(dataW);
}

function openQueueLibrary() {
  const dataQ = localStorage.getItem('arrQueue');
  console.log(dataQ);
}
