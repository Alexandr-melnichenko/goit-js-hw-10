// Імпортую бібліотеки
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Створюю ДОМ обʼєкти та глобальні перемінні
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const inputData = document.querySelector('input#datetime-picker');
let daysData = document.querySelector('.value[data-days]');
let hoursData = document.querySelector('.value[data-hours]');
let minutesData = document.querySelector('.value[data-minutes]');
let secondsData = document.querySelector('.value[data-seconds]');

// Опції та ініціалізація бібліотеки календаря
let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: 'red',
      });
      startButton.disabled = true;
    } else if (selectedDates[0] > new Date()) {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

const calendar = flatpickr('input#datetime-picker', options);
console.log(calendar.selectedDates[0]);


// Створення класу таймеру
class StartTimer {
  constructor(onTick) {
    this.isActive = false; // Инициализация состояния активности
    this.onTick = onTick; // Привязываем коллбек
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;
    startButton.disabled = true;
    inputData.disabled = true;

    let deltaTime = userSelectedDate - new Date();

    this.intervalId = setInterval(() => {
      if (deltaTime >= 1000) {
        deltaTime -= 1000;
      } else {
        deltaTime = 0;
        this.stop(); // Останавливаем таймер
      }
      const time = convertMs(deltaTime);
      this.onTick(time); // Вызываем коллбек
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    startButton.disabled = false;
    inputData.disabled = false;
  }
}

// Функция для отображения значений
function onTick({ days, hours, minutes, seconds }) {
    daysData.innerHTML = days;
    hoursData.innerHTML = hours;
    minutesData.innerHTML = minutes;
    secondsData.innerHTML = seconds;
  }


const pad = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const timer = new StartTimer(onTick);
console.dir(timer);
// Слухачі на події - вибір дати та кнопка старт
startButton.addEventListener('click', () => timer.start());
