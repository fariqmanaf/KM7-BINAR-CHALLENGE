const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");
const { NotFoundError } = require("../utils/request");

const getCarsRepo = (manufacture, model) => {
  if (!manufacture && !model) {
    return cars;
  }

  const searchedCar = cars.filter((car) => {
    if (manufacture && !model) {
      return car.manufacture.toLowerCase().includes(manufacture.toLowerCase());
    }
    if (model && !manufacture) {
      return car.model.toLowerCase().includes(model.toLowerCase());
    }
  });

  return searchedCar;
};

const getCarByIdRepo = (id) => {
  const car = cars.find((car) => car.id == id);
  return car;
};

const createCarRepo = (car) => {
  const newCar = {
    id: uuidv4(),
    ...car,
  };

  cars.push(newCar);

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4));

  return newCar;
};

const updateCarRepo = (id, car) => {
  const findIndex = cars.findIndex((car) => car.id == id);
  if (findIndex !== -1) {
    cars.splice(findIndex, 1, {
      ...cars[findIndex],
      ...car,
    });
  } else {
    throw new NotFoundError("Car not found");
  }

  fs.writeFileSync("./data/cars.json", JSON.stringify(updatedCars, null, 4));

  return cars[findIndex];
};

const deleteCarRepo = (id) => {
  const findIndex = cars.findIndex((car) => car.id == id);
  if (findIndex < 0) {
    return null;
  }

  const deletedCar = cars.splice(findIndex, 1);
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4));
  return deletedCar;
};

module.exports = {
  getCarsRepo,
  getCarByIdRepo,
  createCarRepo,
  updateCarRepo,
  deleteCarRepo,
};
