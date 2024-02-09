function refreshWeather(response) {
  let cityElement = document.querySelector("h1");
  let currentTemperatureValueElement = document.querySelector(
    "#current-temperature-value"
  );
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector(
    "#current-temperature-description"
  );
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");

  console.log(dateElement);

  let temperature = response.data.temperature.current;
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.temperature.humidity);
  let description = response.data.condition.description;
  let now = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(now);
  timeElement = formatTime(now);
  currentTemperatureValueElement.innerHTML = Math.round(temperature);
  feelsLikeElement.innerHTML = feelsLike;
  windElement.innerHTML = windSpeed;
  humidityElement.innerHTML = humidity;
  descriptionElement.innerHTML = description;
}

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    " November",
    "December",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];

  return `${day} ${date} ${month}`;
}

function formatTime(now) {
  let minutes = now.getMinutes();
  let hours = now.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
}

function searchCity(city) {
  apiKey = "7b12a4c8c3fba7979089o3b3ff6teab1";
  apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("form");

searchFormElement.addEventListener("submit", displayCity);

searchCity("Coventry");
