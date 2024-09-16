// імпортую бібліотеку
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Створюю DOM обʼєкти
let inputDelay = document.querySelector('input[type="number"][name="delay"]');
const buttonSubmit = document.querySelector('button');
const radioButton = document.querySelectorAll('input[type="radio"][name="state"]');
const form = document.querySelector('.form');

let delay = 0;
let selectedRadio = '';
inputDelay.addEventListener('input', () => {const newDelay = Number(inputDelay.value);
    if (!isNaN(newDelay) && newDelay >= 0) {
        delay = newDelay;
    } else {
        delay = 0;}
return delay});

// Вибір кнопки фулфіл чи реджект
radioButton.forEach((radio) => {
    radio.addEventListener('click', checkRadio);
});

function checkRadio() {
        for (let i = 0; i < radioButton.length; i++) {
        if(radioButton[i].checked) {
            selectedRadio = radioButton[i].value;
            break
        }
    }
    console.log('selected radio:', selectedRadio);
    return selectedRadio;
}

// Колбек функція для сабміт кнопки
function onSubmitButtonClick (event) {
    event.preventDefault();
    
// Перевірка на наявність вибраної радіокнопки
if (!selectedRadio || !delay) {
    iziToast.show({
        message: `⚠️ Please select a state (fulfilled/rejected) and fill delay input`,
        position: 'topCenter',
        color: 'yellow',
    });
    return;
}

// Зберігаю значення форми перед її очисткою
let savedDelay = delay;
let savedSelectedRadio = selectedRadio;

form.reset(delay = 0, selectedRadio = '');

  // Створюю проміс
const promise = new Promise ((resolve, reject) => {
    console.log('promise delay:', savedDelay)
    console.log('promise radio:', savedSelectedRadio);
setTimeout (() => {    
if (savedSelectedRadio === 'fulfilled') {
   resolve();
}
else if (savedSelectedRadio === 'rejected') {
   reject();
}
}, savedDelay);
});

promise
.then(() => {iziToast.show({
    message: `✅ Fulfilled promise in ${savedDelay}ms`,
    position: 'topCenter',
    color: 'green',
  });})
.catch(() => {iziToast.show({
    message: `❌ Rejected promise in ${savedDelay}ms`,
    position: 'topCenter',
    color: 'red',
  });});

//   Обнуляю значення 
// savedDelay = 0;
// savedSelectedRadio = '';

}

  buttonSubmit.addEventListener('click', onSubmitButtonClick);
  
