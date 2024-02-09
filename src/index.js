function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("h1");
  city.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("form");

searchFormElement.addEventListener("submit", displayCity);
