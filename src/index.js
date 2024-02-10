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
  let iconElement = document.querySelector("#icon");

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
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="current-temperature-emoji" id="icon" >`;

  getForecast(response.data.city);
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
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "7b12a4c8c3fba7979089o3b3ff6teab1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
<div class="weather-forecast-date">${day}</div>
<div class="weather-forecast-icon">🌧️</div>
<div class="weather-forcast-temperatures">
<span class="forecast-max-temperature">18º </span>
<span class="forecast-min-temperature"> 13º</span>
</div>
</div>
`;
  });
  let forecastElemenet = document.querySelector("#forecast");
  forecastElemenet.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("form");

searchFormElement.addEventListener("submit", displayCity);

searchCity("Coventry");
