export default function getListCars(cars) {
  
  cars.map((car) => {
    const test = document.getElementById("test");
    test.innerHTML += `
      <p>id: <b>${car.id}</b></p>
      <p>plate: <b>${car.plate}</b></p>
      <p>manufacture: <b>${car.manufacture}</b></p>
      <p>model: <b>${car.model}</b></p>
      <p>available at: <b>${car.availableAt}</b></p>
      <img src=".${car.image}" alt="${car.manufacture}" width="64px">
      <p>available: <b>${car.available}</b></p>
      <p>capacity: <b>${car.capacity}</b></p>
      <hr>
    `;
  });
}
