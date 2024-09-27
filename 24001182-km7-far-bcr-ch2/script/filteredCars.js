export default function filterCars(cars) {
  const driver = document.getElementById("driver").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const passengers = document.getElementById("passengers").value;

  if (driver == 0 || !date) {
    alert("Mohon Isi Semua Data");
    return;
  }

  let filteredCars = [];

  if (driver == 1) {
    filteredCars = cars.filter((car) => car.available == true);
  } else {
    filteredCars = cars.filter((car) => car.available == false);
  }

  if (date) {
    filteredCars = filteredCars.filter((car) => car.availableAt[0] == date);
  }

  if (time) {
    filteredCars = filteredCars.filter((car) => car.availableAt[1] <= time);
  }

  if (passengers) {
    filteredCars = filteredCars.filter((car) => car.capacity >= passengers);
  }

  console.log(filteredCars);
  const result = document.getElementById("result");

  if (filteredCars.length > 0) {
    result.innerHTML = "";
    filteredCars.forEach((car) => {
      result.innerHTML += `
      <div class="card-image shadow-xl p-[1rem] w-[30%] h-[70vh] bg-white rounded-xl flex flex-col justify-center gap-[1.5vh]">
        <img src=".${
          car.image
        }" alt="" class="w-[12vw] h-[15vh] self-center mb-[2vh]">
        <p class="text-[1vw] font-semibold">${(car.manufacture, car.model)}</p>
        <p class="text-[1vw] font-semibold">Rp. ${car.rentPerDay} / hari</p>
        <p class="text-[1vw]">${car.description}</p>
        <div class="person flex flex-row gap-[2vh] items-center">
          <img class="w-[2vw]" src="https://img.icons8.com/pastel-glyph/128/person-male.png" alt="person-male" />
          <p class="text-[1vw] text-gray-600">${car.capacity} Orang</p>
        </div>
        <div class="mesin flex flex-row gap-[2vh] items-center">
          <img class="w-[1.8vw]" src="https://img.icons8.com/ios/50/gear.png" alt="gear" />
          <p class="text-[1vw] text-gray-600">${car.transmission}</p>
        </div>
        <div class="tahun flex flex-row gap-[2vh] items-center">
          <img class="w-[1.5vw]" src="https://img.icons8.com/pastel-glyph/128/calendar.png" alt="date" />
          <p class="text-[1vw] text-gray-600">Tahun ${car.year}</p>
        </div>
        <button class="bg-[#5CB85F] hover:bg-green-700 text-white p-2 mt-[2vh]">Pilih Mobil</button>
      </div>
      `;
    });
  } else {
    result.innerHTML = `
      <p class="text-black border">Maaf, Mobil Tidak Tersedia</p>
    `;
  }
}
