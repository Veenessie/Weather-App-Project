function refreshWeather(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;
  let currentTemperatureValueElement = document.querySelector(
    "#current-temperature-value"
  );
  let temperature = response.data.temperature.current;
  currentTemperatureValueElement.innerHTML = Math.round(temperature);
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
