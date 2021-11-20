function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function loadTemperature(response) {
  let temperatureElement = document.querySelector("#tempUnit");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#tempDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = `190f083641e831566041879e27b9b225`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(loadTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityElementInput = document.querySelector("#city-input");
  search(cityElementInput.value);
}

search("Porto");

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#tempUnit");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempUnit");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function searchLocation(position) {
  let apiKey = "190f083641e831566041879e27b9b225";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(loadTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", showFahrenheit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", showCelsius);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);
