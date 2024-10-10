const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");

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

  fs.writeFileSync(
    "./data/cars.json",
    JSON.stringify([...cars, newCar], null, 4)
  );

  return newCar;
};

const updateCarRepo = (id, car) => {
  let updatedCar = null;
  const updatedCars = cars.map((item) => {
    if (item.id == id) {
      updatedCar = {
        ...item,
        ...car,
      };
      return updatedCar;
    }
    return item;
  });

  fs.writeFileSync("./data/cars.json", JSON.stringify(updatedCars, null, 4));

  return updatedCar;
};

const deleteCarRepo = (id) => {
  const deletedCar = cars.find((car) => car.id == id);
  const updatedCars = cars.filter((car) => car.id != id);

  fs.writeFileSync("./data/cars.json", JSON.stringify(updatedCars, null, 4));

  return deletedCar;
};

module.exports = {
  getCarsRepo,
  getCarByIdRepo,
  createCarRepo,
  updateCarRepo,
  deleteCarRepo,
};
