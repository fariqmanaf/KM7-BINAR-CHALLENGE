import cars from '../data/cars.json' with { type: 'json'};
import getListCars from './getListCars.js';
import filterCars from './filteredCars.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeCars() {
  cars.map((car) => {
    const timeAt = new Date();
    const randomDays = getRandomInt(0, 7);
    const availableAt = new Date(timeAt.getTime() + randomDays * 24 * 60 * 60 * 1000);

    const randomHour = getRandomInt(8, 19);
    availableAt.setHours(randomHour, 0, 0, 0);

    car.availableAt = availableAt.toISOString().split('T');
  });

  localStorage.setItem('randomCars', JSON.stringify(cars));

  return cars;
}

let currentCars = JSON.parse(localStorage.getItem('randomCars')) || randomizeCars();
const randomizeButton = document.getElementById("randomize");
const submitButton = document.getElementById("submit");

if(randomizeButton) {
  randomizeButton.addEventListener("click", () => {
    getListCars(currentCars);
  });
}

if(submitButton) {
  submitButton.addEventListener("click", () => {
    filterCars(currentCars);
  });
}