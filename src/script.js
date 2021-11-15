let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = new Date();

let currentDay = days[currentDate.getDay()];

let currentHours = currentDate.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let todayDate = `${currentDay}, ${currentHours}:${currentMinutes}`;
console.log(todayDate);

function search(city) {
  let apiKey = "190f083641e831566041879e27b9b225";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempUnit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#tempDescription").innerHTML =
    response.data.weather[0].description;
}
search("Porto");

function searchLocation(position) {
  let apiKey = "190f083641e831566041879e27b9b225";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let date = document.querySelector(".week-input");
date.innerHTML = `${todayDate}`;

let form = document.querySelector("#city-form");
form.addEventListener("submit", findCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

